/*
 * Copyright (c) 2010-2023 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */
package org.eclipse.scout.rt.client.extension.ui.form.fields.pagefield;

import org.eclipse.scout.rt.client.extension.ui.form.fields.groupbox.AbstractGroupBoxExtension;
import org.eclipse.scout.rt.client.extension.ui.form.fields.pagefield.PageFieldChains.PageFieldPageChangedChain;
import org.eclipse.scout.rt.client.ui.desktop.outline.pages.IPage;
import org.eclipse.scout.rt.client.ui.form.fields.pagefield.AbstractPageField;

public abstract class AbstractPageFieldExtension<T extends IPage, OWNER extends AbstractPageField<T>> extends AbstractGroupBoxExtension<OWNER> implements IPageFieldExtension<T, OWNER> {

  public AbstractPageFieldExtension(OWNER owner) {
    super(owner);
  }

  @Override
  public void execPageChanged(PageFieldPageChangedChain<T> chain, T oldPage, T newPage) {
    chain.execPageChanged(oldPage, newPage);
  }
}
