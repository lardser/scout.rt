/*******************************************************************************
 * Copyright (c) 2010-2015 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 ******************************************************************************/
package org.eclipse.scout.rt.shared.extension.dto.fixture;

import javax.annotation.Generated;

import org.eclipse.scout.rt.shared.data.form.AbstractFormData;
import org.eclipse.scout.rt.shared.data.form.fields.AbstractValueFieldData;

/**
 * <b>NOTE:</b><br>
 * This class is auto generated by the Scout SDK. No manual modifications recommended.
 */
@Generated(value = "org.eclipse.scout.rt.shared.extension.dto.fixture.OrigForm", comments = "This class is auto generated by the Scout SDK. No manual modifications recommended.")
public class OrigFormData extends AbstractFormData {

  private static final long serialVersionUID = 1L;

  public OrigFormData() {
  }

  public FirstString getFirstString() {
    return getFieldByClass(FirstString.class);
  }

  public FirstUseOfTemplateBox getFirstUseOfTemplateBox() {
    return getFieldByClass(FirstUseOfTemplateBox.class);
  }

  public SecondUseOfTemplateBox getSecondUseOfTemplateBox() {
    return getFieldByClass(SecondUseOfTemplateBox.class);
  }

  public static class FirstString extends AbstractValueFieldData<String> {

    private static final long serialVersionUID = 1L;

    public FirstString() {
    }
  }

  public static class FirstUseOfTemplateBox extends AbstractTemplateBoxData {

    private static final long serialVersionUID = 1L;

    public FirstUseOfTemplateBox() {
    }
  }

  public static class SecondUseOfTemplateBox extends AbstractTemplateBoxData {

    private static final long serialVersionUID = 1L;

    public SecondUseOfTemplateBox() {
    }
  }
}
