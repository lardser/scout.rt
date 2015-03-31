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
package org.eclipse.scout.rt.server.context;

import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;

import org.eclipse.scout.commons.ICallable;
import org.eclipse.scout.commons.IChainable;
import org.eclipse.scout.commons.nls.NlsLocale;
import org.eclipse.scout.rt.platform.context.InitThreadLocalCallable;
import org.eclipse.scout.rt.platform.context.SubjectCallable;
import org.eclipse.scout.rt.platform.job.PropertyMap;
import org.eclipse.scout.rt.server.IServerSession;
import org.eclipse.scout.rt.server.commons.servletfilter.IHttpServletRoundtrip;
import org.eclipse.scout.rt.shared.ISession;
import org.eclipse.scout.rt.shared.OfflineState;
import org.eclipse.scout.rt.shared.ScoutTexts;
import org.eclipse.scout.rt.shared.ui.UserAgent;
import org.eclipse.scout.rt.testing.platform.runner.PlatformTestRunner;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

@RunWith(PlatformTestRunner.class)
public class ServerRunContextChainTest {

  @Mock
  private ICallable<Void> m_targetCallable;

  @Before
  public void before() {
    MockitoAnnotations.initMocks(this);
    ISession.CURRENT.set(mock(IServerSession.class));
  }

  @After
  public void after() {
    ISession.CURRENT.remove();
  }

  /**
   * Tests the correct order of interceptors in {@link ServerRunContext}.
   */
  @Test
  public void testCallableChain() throws Exception {
    ICallable<Void> actualCallable = new ServerRunContext().interceptCallable(m_targetCallable);

    // 1. SubjectCallable
    SubjectCallable c1 = getFirstAndAssert(actualCallable, SubjectCallable.class);

    // 2. InitThreadLocalCallable for NlsLocale.CURRENT
    InitThreadLocalCallable c2 = getNextAndAssert(c1, InitThreadLocalCallable.class);
    assertSame(NlsLocale.CURRENT, ((InitThreadLocalCallable) c2).getThreadLocal());

    // 3. InitThreadLocalCallable for PropertyMap.CURRENT
    InitThreadLocalCallable c3 = getNextAndAssert(c2, InitThreadLocalCallable.class);
    assertSame(PropertyMap.CURRENT, ((InitThreadLocalCallable) c3).getThreadLocal());

    // 4. InitThreadLocalCallable for OfflineState.CURRENT
    InitThreadLocalCallable c4 = getNextAndAssert(c3, InitThreadLocalCallable.class);
    assertSame(OfflineState.CURRENT, ((InitThreadLocalCallable) c4).getThreadLocal());

    // 5. InitThreadLocalCallable for IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_REQUEST
    InitThreadLocalCallable c5 = getNextAndAssert(c4, InitThreadLocalCallable.class);
    assertSame(IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_REQUEST, ((InitThreadLocalCallable) c5).getThreadLocal());

    // 6. InitThreadLocalCallable for IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_RESPONSE
    InitThreadLocalCallable c6 = getNextAndAssert(c5, InitThreadLocalCallable.class);
    assertSame(IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_RESPONSE, ((InitThreadLocalCallable) c6).getThreadLocal());

    // 7. InitThreadLocalCallable for ISession.CURRENT
    InitThreadLocalCallable c7 = getNextAndAssert(c6, InitThreadLocalCallable.class);
    assertSame(ISession.CURRENT, ((InitThreadLocalCallable) c7).getThreadLocal());

    // 8. InitThreadLocalCallable for UserAgent.CURRENT
    InitThreadLocalCallable c8 = getNextAndAssert(c7, InitThreadLocalCallable.class);
    assertSame(UserAgent.CURRENT, ((InitThreadLocalCallable) c8).getThreadLocal());

    // 9. InitThreadLocalCallable for ScoutTexts.CURRENT
    InitThreadLocalCallable c9 = getNextAndAssert(c8, InitThreadLocalCallable.class);
    assertSame(ScoutTexts.CURRENT, ((InitThreadLocalCallable) c9).getThreadLocal());

    // 10. TwoPhaseTransactionBoundaryCallable
    TwoPhaseTransactionBoundaryCallable c10 = getNextAndAssert(c9, TwoPhaseTransactionBoundaryCallable.class);

    // 11. Target
    assertSame(m_targetCallable, c10.getNext());
  }

  /**
   * Tests that new contributions can be installed after the default contributions.
   */
  @Test
  public void testCallableChainWithContributionsAfter() throws Exception {
    ServerRunContext serverRunContext = new ServerRunContext() {

      @Override
      protected <RESULT> ICallable<RESULT> interceptCallable(ICallable<RESULT> next) {
        ICallable<RESULT> p2 = new Contribution2<>(next); // executed 3th
        ICallable<RESULT> p1 = new Contribution1<>(p2); // executed 2nd
        ICallable<RESULT> head = super.interceptCallable(p1); // executed 1st
        return head;
      }
    };

    ICallable<Void> actualCallable = serverRunContext.interceptCallable(m_targetCallable);

    // 1. SubjectCallable
    SubjectCallable c1 = getFirstAndAssert(actualCallable, SubjectCallable.class);

    // 2. InitThreadLocalCallable for NlsLocale.CURRENT
    InitThreadLocalCallable c2 = getNextAndAssert(c1, InitThreadLocalCallable.class);
    assertSame(NlsLocale.CURRENT, ((InitThreadLocalCallable) c2).getThreadLocal());

    // 3. InitThreadLocalCallable for PropertyMap.CURRENT
    InitThreadLocalCallable c3 = getNextAndAssert(c2, InitThreadLocalCallable.class);
    assertSame(PropertyMap.CURRENT, ((InitThreadLocalCallable) c3).getThreadLocal());

    // 4. InitThreadLocalCallable for OfflineState.CURRENT
    InitThreadLocalCallable c4 = getNextAndAssert(c3, InitThreadLocalCallable.class);
    assertSame(OfflineState.CURRENT, ((InitThreadLocalCallable) c4).getThreadLocal());

    // 5. InitThreadLocalCallable for IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_REQUEST
    InitThreadLocalCallable c5 = getNextAndAssert(c4, InitThreadLocalCallable.class);
    assertSame(IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_REQUEST, ((InitThreadLocalCallable) c5).getThreadLocal());

    // 6. InitThreadLocalCallable for IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_RESPONSE
    InitThreadLocalCallable c6 = getNextAndAssert(c5, InitThreadLocalCallable.class);
    assertSame(IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_RESPONSE, ((InitThreadLocalCallable) c6).getThreadLocal());

    // 7. InitThreadLocalCallable for ISession.CURRENT
    InitThreadLocalCallable c7 = getNextAndAssert(c6, InitThreadLocalCallable.class);
    assertSame(ISession.CURRENT, ((InitThreadLocalCallable) c7).getThreadLocal());

    // 8. InitThreadLocalCallable for UserAgent.CURRENT
    InitThreadLocalCallable c8 = getNextAndAssert(c7, InitThreadLocalCallable.class);
    assertSame(UserAgent.CURRENT, ((InitThreadLocalCallable) c8).getThreadLocal());

    // 9. InitThreadLocalCallable for ScoutTexts.CURRENT
    InitThreadLocalCallable c9 = getNextAndAssert(c8, InitThreadLocalCallable.class);
    assertSame(ScoutTexts.CURRENT, ((InitThreadLocalCallable) c9).getThreadLocal());

    // 10. TwoPhaseTransactionBoundaryCallable
    TwoPhaseTransactionBoundaryCallable c10 = getNextAndAssert(c9, TwoPhaseTransactionBoundaryCallable.class);

    // 11. Contribution1
    Contribution1 c11 = getNextAndAssert(c10, Contribution1.class);

    // 12. Contribution2
    Contribution2 c12 = getNextAndAssert(c11, Contribution2.class);

    // 13. Target
    assertSame(m_targetCallable, c12.getNext());
  }

  /**
   * Tests that new contributions can be installed before the default contributions.
   */
  @Test
  public void testCallableChainWithContributionsBefore() throws Exception {
    ServerRunContext serverRunContext = new ServerRunContext() {

      @Override
      protected <RESULT> ICallable<RESULT> interceptCallable(ICallable<RESULT> next) {
        ICallable<RESULT> p2 = super.interceptCallable(next); // executed 3th
        ICallable<RESULT> p1 = new Contribution2<>(p2); // executed 2nd
        ICallable<RESULT> head = new Contribution1<>(p1); // executed 1st
        return head;
      }
    };

    ICallable<Void> actualCallable = serverRunContext.interceptCallable(m_targetCallable);

    // 1. Contribution1
    Contribution1 c1 = getFirstAndAssert(actualCallable, Contribution1.class);

    // 2. Contribution2
    Contribution2 c2 = getNextAndAssert(c1, Contribution2.class);

    // 3. SubjectCallable
    SubjectCallable c3 = getNextAndAssert(c2, SubjectCallable.class);

    // 4. InitThreadLocalCallable for NlsLocale.CURRENT
    InitThreadLocalCallable c4 = getNextAndAssert(c3, InitThreadLocalCallable.class);
    assertSame(NlsLocale.CURRENT, ((InitThreadLocalCallable) c4).getThreadLocal());

    // 5. InitThreadLocalCallable for PropertyMap.CURRENT
    InitThreadLocalCallable c5 = getNextAndAssert(c4, InitThreadLocalCallable.class);
    assertSame(PropertyMap.CURRENT, ((InitThreadLocalCallable) c5).getThreadLocal());

    // 6. InitThreadLocalCallable for OfflineState.CURRENT
    InitThreadLocalCallable c6 = getNextAndAssert(c5, InitThreadLocalCallable.class);
    assertSame(OfflineState.CURRENT, ((InitThreadLocalCallable) c6).getThreadLocal());

    // 7. InitThreadLocalCallable for IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_REQUEST
    InitThreadLocalCallable c7 = getNextAndAssert(c6, InitThreadLocalCallable.class);
    assertSame(IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_REQUEST, ((InitThreadLocalCallable) c7).getThreadLocal());

    // 8. InitThreadLocalCallable for IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_RESPONSE
    InitThreadLocalCallable c8 = getNextAndAssert(c7, InitThreadLocalCallable.class);
    assertSame(IHttpServletRoundtrip.CURRENT_HTTP_SERVLET_RESPONSE, ((InitThreadLocalCallable) c8).getThreadLocal());

    // 9. InitThreadLocalCallable for ISession.CURRENT
    InitThreadLocalCallable c9 = getNextAndAssert(c8, InitThreadLocalCallable.class);
    assertSame(ISession.CURRENT, ((InitThreadLocalCallable) c9).getThreadLocal());

    // 10. InitThreadLocalCallable for UserAgent.CURRENT
    InitThreadLocalCallable c10 = getNextAndAssert(c9, InitThreadLocalCallable.class);
    assertSame(UserAgent.CURRENT, ((InitThreadLocalCallable) c10).getThreadLocal());

    // 11. InitThreadLocalCallable for ScoutTexts.CURRENT
    InitThreadLocalCallable c11 = getNextAndAssert(c10, InitThreadLocalCallable.class);
    assertSame(ScoutTexts.CURRENT, ((InitThreadLocalCallable) c11).getThreadLocal());

    // 12. TwoPhaseTransactionBoundaryCallable
    TwoPhaseTransactionBoundaryCallable c12 = getNextAndAssert(c11, TwoPhaseTransactionBoundaryCallable.class);

    // 13. Target
    assertSame(m_targetCallable, c12.getNext());
  }

  @SuppressWarnings("unchecked")
  private static <RESULT, TYPE> TYPE getFirstAndAssert(ICallable<RESULT> first, Class<TYPE> expectedType) {
    assertTrue(expectedType.equals(first.getClass()));
    return (TYPE) first;
  }

  @SuppressWarnings("unchecked")
  private static <RESULT, TYPE> TYPE getNextAndAssert(IChainable<?> c, Class<TYPE> expectedType) {
    ICallable<?> next = (ICallable<?>) c.getNext();
    assertTrue(expectedType.equals(next.getClass()));
    return (TYPE) next;
  }

  private static class Contribution1<RESULT> implements ICallable<RESULT>, IChainable<ICallable<RESULT>> {

    private final ICallable<RESULT> m_next;

    public Contribution1(ICallable<RESULT> next) {
      m_next = next;
    }

    @Override
    public RESULT call() throws Exception {
      return m_next.call();
    }

    @Override
    public ICallable<RESULT> getNext() {
      return m_next;
    }
  }

  private static class Contribution2<RESULT> implements ICallable<RESULT>, IChainable<ICallable<RESULT>> {

    private final ICallable<RESULT> m_next;

    public Contribution2(ICallable<RESULT> next) {
      m_next = next;
    }

    @Override
    public RESULT call() throws Exception {
      return m_next.call();
    }

    @Override
    public ICallable<RESULT> getNext() {
      return m_next;
    }
  }
}
