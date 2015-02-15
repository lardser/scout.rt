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
package org.eclipse.scout.rt.server.job.interceptor;

import java.security.PrivilegedActionException;
import java.security.PrivilegedExceptionAction;
import java.util.concurrent.Callable;

import javax.security.auth.Subject;

import org.eclipse.scout.commons.Assertions;
import org.eclipse.scout.commons.job.interceptor.Chainable;

/**
 * Processor to run the subsequent sequence of actions on behalf of the given {@link Subject}.
 * <p/>
 * This {@link Callable} is a processing object in the language of the design pattern 'chain-of-responsibility'.
 *
 * @param <R>
 *          the result type of the job's computation.
 * @since 5.1
 */
public class PrivilegedActionRunner<R> implements Callable<R>, Chainable {

  protected final Callable<R> m_next;
  protected final Subject m_subject;

  /**
   * Creates a processor to run the subsequent sequence of actions on behalf of the given {@link Subject}.
   *
   * @param next
   *          next processor in the chain; must not be <code>null</code>.
   * @param subject
   *          {@link Subject} on behalf of which to run the following processors; use <code>null</code> if not to be run
   *          in privileged mode.
   */
  public PrivilegedActionRunner(final Callable<R> next, final Subject subject) {
    m_next = Assertions.assertNotNull(next);
    m_subject = subject;
  }

  @Override
  public R call() throws Exception {
    if (m_subject == null) {
      return m_next.call();
    }
    else {
      try {
        return Subject.doAs(m_subject, new PrivilegedExceptionAction<R>() {

          @Override
          public R run() throws Exception {
            return m_next.call();
          }
        });
      }
      catch (final PrivilegedActionException e) {
        throw e.getException();
      }
    }
  }

  @Override
  public Object getNext() {
    return m_next;
  }
}
