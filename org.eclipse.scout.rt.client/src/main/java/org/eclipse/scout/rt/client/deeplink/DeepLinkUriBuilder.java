/*
 * Copyright (c) BSI Business Systems Integration AG. All rights reserved.
 * http://www.bsiag.com/
 */
package org.eclipse.scout.rt.client.deeplink;

import java.net.URI;
import java.net.URL;

import org.eclipse.scout.rt.client.session.ClientSessionProvider;
import org.eclipse.scout.rt.client.ui.desktop.BrowserHistoryEntry;
import org.eclipse.scout.rt.client.ui.desktop.IDesktop;
import org.eclipse.scout.rt.platform.util.StringUtility;
import org.eclipse.scout.rt.platform.util.UriBuilder;

public class DeepLinkUriBuilder {

  private final UriBuilder m_builder;

  private String m_info;

  private String m_path;

  private DeepLinkUriBuilder(UriBuilder builder) {
    m_builder = builder;
  }

  public static DeepLinkUriBuilder createAbsolute() {
    return new DeepLinkUriBuilder(new UriBuilder(getDesktop().getUiBaseUrl()));
  }

  public static DeepLinkUriBuilder createRelative() {
    return new DeepLinkUriBuilder(new UriBuilder("./"));
  }

  public DeepLinkUriBuilder parameterPath(String path) {
    m_path = path;
    m_builder.parameter(IDeepLinks.PARAM_NAME_DEEP_LINK, path);
    return this;
  }

  /**
   * Sets the 'info' field used to create a BrowserHistoryEntry. Use this method if you want to set the info but don't
   * want to add an info-parameter to the URL.
   */
  public DeepLinkUriBuilder info(String info) {
    m_info = info;
    return this;
  }

  public DeepLinkUriBuilder parameterInfo(String info) {
    if (StringUtility.hasText(info)) {
      m_info = info;
      m_builder.parameter(IDeepLinks.PARAM_NAME_INFO, DeepLinkUtility.toSlug(info));
    }
    return this;
  }

  public DeepLinkUriBuilder parameter(String name, String value) {
    m_builder.parameter(name, value);
    return this;
  }

  public BrowserHistoryEntry createBrowserHistoryEntry() {
    if (m_path == null) {
      throw new IllegalStateException("Cannot create BrowserHistoryEntry without deep-link path");
    }
    StringBuilder title = new StringBuilder(getDesktop().getTitle());
    if (StringUtility.hasText(m_info)) {
      title.append(" - ").append(m_info);
    }
    return new BrowserHistoryEntry(m_builder.createURI(), title.toString(), m_path);
  }

  private static IDesktop getDesktop() {
    return ClientSessionProvider.currentSession().getDesktop();
  }

  public URL createURL() {
    return m_builder.createURL();
  }

  public URI createURI() {
    return m_builder.createURI();
  }

}
