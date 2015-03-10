/*******************************************************************************
 * Copyright (c) 2015 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 ******************************************************************************/
package org.eclipse.scout.rt.platform.fixture;

import org.eclipse.scout.rt.platform.ApplicationScoped;
import org.eclipse.scout.rt.platform.IApplication;

/**
 *
 */
public class TestApplication implements IApplication {

  private static TestApplication instance;

  @Override
  public void start() {
    instance = this;
  }

  @Override
  public void stop() {
    instance = null;
  }

  public static TestApplication getInstance() {
    return instance;
  }

  @Override
  public String getName() {
    return "test app";
  }

  @Override
  public String getVersion() {
    return "0.0.0";
  }

}
