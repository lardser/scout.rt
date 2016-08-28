package org.eclipse.scout.rt.mom.jms;

import java.security.GeneralSecurityException;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.Session;

import org.eclipse.scout.rt.mom.api.IDestination;
import org.eclipse.scout.rt.mom.api.IMessage;
import org.eclipse.scout.rt.mom.api.IMessageListener;
import org.eclipse.scout.rt.mom.api.IMom;
import org.eclipse.scout.rt.mom.api.ISubscription;
import org.eclipse.scout.rt.mom.api.encrypter.IEncrypter;
import org.eclipse.scout.rt.mom.api.marshaller.IMarshaller;
import org.eclipse.scout.rt.mom.jms.JmsMom.MomExceptionHandler;
import org.eclipse.scout.rt.platform.BEANS;
import org.eclipse.scout.rt.platform.Bean;
import org.eclipse.scout.rt.platform.context.RunContext;
import org.eclipse.scout.rt.platform.job.Jobs;
import org.eclipse.scout.rt.platform.util.concurrent.IRunnable;

/**
 * Messages are acknowledged automatically upon their receipt. This strategy has less footprint than
 * {@link TransactedStrategy}, and allows concurrent message processing.
 * <p>
 *
 * @see IMom#ACKNOWLEDGE_AUTO
 * @since 6.1
 */
@Bean
public class AutoAcknowledgeStrategy implements ISubscriptionStrategy {

  private volatile JmsMom m_mom;

  public ISubscriptionStrategy init(final JmsMom mom) {
    m_mom = mom;
    return this;
  }

  @Override
  public <DTO> ISubscription subscribe(final IDestination<DTO> destination, final IMessageListener<DTO> listener, final RunContext runContext) throws JMSException {
    final IMarshaller marshaller = m_mom.lookupMarshaller(destination);
    final IEncrypter encrypter = m_mom.lookupEncrypter(destination);

    final Session defaultSession = m_mom.getDefaultSession();
    final MessageConsumer consumer = defaultSession.createConsumer(m_mom.lookupJmsDestination(destination, defaultSession));
    consumer.setMessageListener(new JmsMessageListener() {

      @Override
      public void onJmsMessage(final Message jmsMessage) throws JMSException, GeneralSecurityException {
        final JmsMessageReader<DTO> messageReader = JmsMessageReader.newInstance(jmsMessage, marshaller, encrypter);
        final IMessage<DTO> message = messageReader.readMessage();

        Jobs.schedule(new IRunnable() {

          @Override
          public void run() throws Exception {
            handleMessage(listener, message);
          }
        }, Jobs.newInput()
            .withName("Receiving JMS message [msg={}]", jmsMessage)
            .withExceptionHandling(BEANS.get(MomExceptionHandler.class), true)
            .withRunContext(runContext
                .withCorrelationId(messageReader.readCorrelationId())
                .withThreadLocal(IMessage.CURRENT, message)));
      }
    });
    return new JmsSubscription(consumer, destination);
  }

  /**
   * Method invoked upon the receipt of a message.
   */
  protected <DTO> void handleMessage(final IMessageListener<DTO> listener, final IMessage<DTO> message) {
    listener.onMessage(message);
  }
}
