/*******************************************************************************
 * Copyright (c) 2010 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 ******************************************************************************/
package org.eclipse.scout.rt.client.mobile.transformation;

import org.eclipse.scout.rt.client.mobile.navigation.IBreadCrumbsNavigationService;
import org.eclipse.scout.rt.client.mobile.ui.desktop.MobileDesktopUtility;
import org.eclipse.scout.rt.client.mobile.ui.desktop.MultiPageChangeStrategy;
import org.eclipse.scout.rt.client.mobile.ui.form.outline.IOutlineChooserForm;
import org.eclipse.scout.rt.client.mobile.ui.form.outline.PageForm;
import org.eclipse.scout.rt.client.mobile.ui.form.outline.PageFormManager;
import org.eclipse.scout.rt.client.ui.desktop.IDesktop;
import org.eclipse.scout.rt.client.ui.desktop.outline.IOutline;
import org.eclipse.scout.rt.client.ui.desktop.outline.IOutlineTableForm;
import org.eclipse.scout.rt.client.ui.desktop.outline.IOutlineTreeForm;
import org.eclipse.scout.rt.client.ui.desktop.outline.IPageChangeStrategy;
import org.eclipse.scout.rt.client.ui.form.IForm;
import org.eclipse.scout.rt.client.ui.form.fields.IFormField;
import org.eclipse.scout.service.SERVICES;

/**
 * @since 3.9.0
 */
public class TabletDeviceTransformer extends AbstractDeviceTransformer {
  private static int DIALOG_FORM_WIDTH = 700;
  private static int EAST_FORM_WIDTH = 700;
  private static int TOOL_FORM_WIDTH = 320;

  public TabletDeviceTransformer() {
    super(null);
  }

  public TabletDeviceTransformer(IDesktop desktop) {
    super(desktop);

    SERVICES.getService(IBreadCrumbsNavigationService.class).getBreadCrumbsNavigation(desktop).trackDisplayViewId(IForm.VIEW_ID_CENTER);
  }

  @Override
  protected PageFormManager createPageFormManager(IDesktop desktop) {
    PageFormManager manager = new PageFormManager(desktop, IForm.VIEW_ID_CENTER, IForm.VIEW_ID_E);
    manager.setTableStatusVisible(!shouldPageTableStatusBeHidden());

    initMultiPageChangeStrategy();

    return manager;
  }

  private void initMultiPageChangeStrategy() {
    IPageChangeStrategy strategy = new MultiPageChangeStrategy();
    for (IOutline outline : getDesktop().getAvailableOutlines()) {
      outline.setPageChangeStrategy(strategy);
    }
  }

  @Override
  protected void transformDisplayHintSettings(IForm form) {
    if (form instanceof IOutlineTreeForm) {
      return;
    }

    if (form.getDisplayHint() != IForm.DISPLAY_HINT_VIEW) {
      MobileDesktopUtility.setFormWidthHint(form, DIALOG_FORM_WIDTH);
    }
    else {
      if (MobileDesktopUtility.isToolForm(form)) {
        form.setDisplayViewId(IForm.VIEW_ID_E);
        MobileDesktopUtility.setFormWidthHint(form, TOOL_FORM_WIDTH);
      }
      else if (form instanceof IOutlineTableForm || form instanceof IOutlineChooserForm) {
        form.setDisplayViewId(IForm.VIEW_ID_CENTER);
      }
      else {
        if (form instanceof PageForm && !IForm.VIEW_ID_E.equals(form.getDisplayViewId())) {
          return;
        }

        MobileDesktopUtility.closeAllToolForms();

        form.setDisplayViewId(IForm.VIEW_ID_E);
        MobileDesktopUtility.setFormWidthHint(form, EAST_FORM_WIDTH);
      }
    }

  }

  @Override
  protected boolean shouldPageTableStatusBeHidden() {
    return false;
  }

  /**
   * Only moves the label to the top if it's a tool form. Regular forms have are big enough on tablet to display it on
   * the left side.
   */
  @Override
  protected void moveLabelToTop(IFormField field) {
    if (MobileDesktopUtility.isToolForm(field.getForm())) {
      super.moveLabelToTop(field);
    }
  }

}
