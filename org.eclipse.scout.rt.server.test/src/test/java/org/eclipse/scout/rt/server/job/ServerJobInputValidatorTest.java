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
package org.eclipse.scout.rt.server.job;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;

import org.eclipse.scout.commons.Assertions.AssertionException;
import org.eclipse.scout.rt.platform.context.RunContexts;
import org.eclipse.scout.rt.platform.job.JobInput;
import org.eclipse.scout.rt.server.IServerSession;
import org.eclipse.scout.rt.server.context.ServerRunContexts;
import org.eclipse.scout.rt.server.transaction.TransactionScope;
import org.eclipse.scout.rt.testing.platform.runner.PlatformTestRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(PlatformTestRunner.class)
public class ServerJobInputValidatorTest {

  @Test
  public void test1() {
    new ServerJobInputValidator().validate(new JobInput().runContext(ServerRunContexts.empty().session(mock(IServerSession.class))));
    assertTrue(true);
  }

  @Test(expected = AssertionException.class)
  public void testNullServerRunContext() {
    new ServerJobInputValidator().validate(new JobInput());
  }

  @Test(expected = AssertionException.class)
  public void testWrongRunContext() {
    new ServerJobInputValidator().validate(new JobInput().runContext(RunContexts.empty()));
  }

  @Test(expected = AssertionException.class)
  public void testNullServerSession1() {
    new ServerJobInputValidator().validate(new JobInput().runContext(ServerRunContexts.empty()));
  }

  @Test(expected = AssertionException.class)
  public void testNullServerSession2() {
    new ServerJobInputValidator().validate(new JobInput().runContext(ServerRunContexts.empty().session(null)));
  }

  @Test
  public void testTransactionScopeRequiresNew() {
    new ServerJobInputValidator().validate(new JobInput().runContext(ServerRunContexts.empty().session(mock(IServerSession.class)).transactionScope(TransactionScope.REQUIRES_NEW)));
    assertTrue(true);
  }

  @Test(expected = AssertionException.class)
  public void testTransactionScopeRequired() {
    new ServerJobInputValidator().validate(new JobInput().runContext(ServerRunContexts.empty().session(mock(IServerSession.class)).transactionScope(TransactionScope.REQUIRED)));
  }

  @Test(expected = AssertionException.class)
  public void testTransactionScopeMandatory() {
    new ServerJobInputValidator().validate(new JobInput().runContext(ServerRunContexts.empty().session(mock(IServerSession.class)).transactionScope(TransactionScope.MANDATORY)));
  }

  @Test(expected = AssertionException.class)
  public void testTransactionScopeNull() {
    new ServerJobInputValidator().validate(new JobInput().runContext(ServerRunContexts.empty().session(mock(IServerSession.class)).transactionScope(null)));
  }
}
