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
package org.eclipse.scout.rt.platform.exception;

/**
 * Interface used to define how {@link Throwable}s are translated.
 */
public interface IThrowableTranslator<ERROR extends Throwable> {

  /**
   * Translates the given {@link Throwable}.
   */
  ERROR translate(Throwable t);
}
