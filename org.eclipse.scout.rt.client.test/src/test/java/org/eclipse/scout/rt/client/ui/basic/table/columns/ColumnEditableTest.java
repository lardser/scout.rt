/*******************************************************************************
 * Copyright (c) 2013 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 ******************************************************************************/
package org.eclipse.scout.rt.client.ui.basic.table.columns;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import org.eclipse.scout.commons.annotations.Order;
import org.eclipse.scout.commons.exception.ProcessingException;
import org.eclipse.scout.rt.client.ui.basic.table.AbstractTable;
import org.eclipse.scout.rt.client.ui.basic.table.ITableRow;
import org.eclipse.scout.rt.client.ui.form.fields.IFormField;
import org.eclipse.scout.rt.testing.platform.runner.PlatformTestRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Tests the editable property in a table (model)
 * see {@link AbstractColumn}
 */
@RunWith(PlatformTestRunner.class)
public class ColumnEditableTest {

  /**
   * Tests, if column is not editable by default
   */
  @Test
  public void testInitiallyEditable() {
    AbstractColumn<String> column = getEmptyStringColumn();
    assertFalse(column.isEditable());
  }

  /**
   * Tests, if setting column editable works
   */
  @Test
  public void testSettingProperty() {
    AbstractColumn<String> column = getEmptyStringColumn();
    column.setEditable(true);
    assertTrue(column.isEditable());
    column.setEditable(false);
    assertFalse(column.isEditable());
  }

  private AbstractColumn<String> getEmptyStringColumn() {
    return new AbstractColumn<String>() {
    };
  }

  private String[] getTestRow() {
    return new String[]{"a"};
  }

  /**
   * Tests, if a field in the editable column is valid
   *
   * @throws ProcessingException
   */
  @Test
  public void testFieldInEditableColumn() throws ProcessingException {
    EditableTestTable testTable = new EditableTestTable();
    testTable.setEnabled(true);
    testTable.addRowByArray(getTestRow());
    IColumn editableCol = testTable.getEditableTestColumn();
    assertTrue(editableCol.isEditable());
    assertTrue(testTable.getCell(0, 0).isEditable());

    IFormField field = editableCol.prepareEdit(testTable.getRow(0));
    assertNotNull(field);
    assertTrue(field.isEnabled());
  }

  /**
   * Tests if cell can set to be dynamically not editable with execIsEditable
   */
  @Test
  public void testDynamicEditableColumn() throws ProcessingException {
    DynamicEditableTestTable testTable = new DynamicEditableTestTable();
    testTable.setEnabled(true);
    testTable.addRowByArray(getTestRow());
    testTable.addRowByArray(getTestRow());
    IColumn editableCol = testTable.getDynamicEditableTestColumn();
    assertTrue(editableCol.isEditable());

    IFormField field = editableCol.prepareEdit(testTable.getRow(0));
    assertNotNull(field);
    assertTrue(field.isEnabled());

    field = editableCol.prepareEdit(testTable.getRow(1));
    assertNull(field);

    assertTrue(testTable.getCell(0, 0).isEditable());
    assertFalse(testTable.getCell(1, 0).isEditable());
  }

  /**
   * A table with an editable test column
   */
  @Order(10.0)
  public class EditableTestTable extends AbstractTable {

    /**
     * @return An editable test column
     */
    public EditableTestColumn getEditableTestColumn() {
      return getColumnSet().getColumnByClass(EditableTestColumn.class);
    }

    /**
     * Editable test column
     */
    @Order(10.0)
    public class EditableTestColumn extends AbstractStringColumn {

      @Override
      protected boolean getConfiguredEditable() {
        return true;
      }

    }

  }

  /**
   * A table with a test column where only the first row is editable.
   */
  @Order(10.0)
  public class DynamicEditableTestTable extends AbstractTable {

    public DynamicEditableTestColumn getDynamicEditableTestColumn() {
      return getColumnSet().getColumnByClass(DynamicEditableTestColumn.class);
    }

    /**
     * A test column that where only the first row is editable.
     */
    @Order(10.0)
    public class DynamicEditableTestColumn extends AbstractStringColumn {

      @Override
      protected boolean getConfiguredEditable() {
        return true;
      }

      @Override
      protected boolean execIsEditable(ITableRow row) throws ProcessingException {
        return row.getRowIndex() == 0;
      }

    }

  }

}
