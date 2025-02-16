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
package org.eclipse.scout.rt.jackson.dataobject;

import static org.eclipse.scout.rt.platform.util.Assertions.assertTrue;

import java.io.Serializable;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.scout.rt.platform.Bean;
import org.eclipse.scout.rt.platform.util.NumberUtility;
import org.eclipse.scout.rt.platform.util.ObjectUtility;

/**
 * Own comparator for tree map using to serialize nodes to obtain a consistent order when serializing typed vs. raw do
 * entities.
 * <p>
 * {@link #init(ScoutDataObjectModuleContext)} must be called.
 * <p>
 * Not part of API, but using the following order of attributes to provide a better readability:
 * <ol>
 * <li>Type name attribute
 * <li>Type version attribute
 * <li>Other attributes (ordered alphabetically)
 * <li>Contributions attribute (unchanged order of contribution items)</li>
 * </ol>
 */
@Bean
public class DoEntitySerializerAttributeNameComparator implements Comparator<String>, Serializable {

  private static final long serialVersionUID = 1L;

  protected Map<String, Integer> m_orders = new HashMap<>();

  public DoEntitySerializerAttributeNameComparator init(ScoutDataObjectModuleContext context) {
    assertTrue(m_orders.isEmpty(), "Already initialized"); // avoid duplicate initialization as otherwise multiple different attribut names may be considered equal
    m_orders.put(context.getTypeAttributeName(), -2); // always first
    m_orders.put(context.getTypeVersionAttributeName(), -1); // always second
    m_orders.put(context.getContributionsAttributeName(), 1); // always last
    return this;
  }

  @Override
  public int compare(String o1, String o2) {
    int result = ObjectUtility.compareTo(o1, o2);
    if (result == 0) {
      return result; // equal
    }

    Integer order1 = m_orders.get(o1);
    Integer order2 = m_orders.get(o2);
    if (order1 == null && order2 == null) {
      // no attribute names that require special handling
      return result;
    }

    // Use 0 as indicator for values between first and last
    order1 = NumberUtility.nvl(order1, 0);
    order2 = NumberUtility.nvl(order2, 0);
    return order1 - order2;
  }
}
