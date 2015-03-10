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
package org.eclipse.scout.rt.platform.pluginxml.internal;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.eclipse.scout.commons.logger.IScoutLogger;
import org.eclipse.scout.commons.logger.ScoutLogManager;

/**
 * To resolve all plugin.xml and fragment.xml on the classpath.
 */
public final class PluginXmlResolver {
  private static final IScoutLogger LOG = ScoutLogManager.getLogger(PluginXmlResolver.class);

  private PluginXmlResolver() {
  }

  /**
   * @return all fragment.xml and plugin.xml files resolved on the classpath.
   */
  public static List<IPluginXml> resolvePluginXml() {
    return resolvePluginXmlPureJava();
  }

  /**
   * @return
   */

  private static List<IPluginXml> resolvePluginXmlPureJava() {
    List<IPluginXml> pluginXmls = new LinkedList<IPluginXml>();
    // change the lookup to ResourceXmlResolver.class.getClassLoader.getResources("plugin.xml") once all plugin.xml files are on the classpath
    for (URL pluginUrl : findResourcesNoOsgi("plugin.xml")) {
      if (pluginUrl != null) {
        pluginXmls.add(new PluginXml(pluginUrl));
      }
    }
    for (URL fragmentXmlUrl : findResourcesNoOsgi("fragment.xml")) {
      if (fragmentXmlUrl != null) {
        pluginXmls.add(new PluginXml(fragmentXmlUrl));
      }
    }
    return pluginXmls;
  }

  private static Set<URL> findResourcesNoOsgi(String fileName) {
    Set<URL> pluginXmlUrls = new HashSet<URL>();
    try {
      Enumeration<URL> classPathPluginXmls = PluginXmlResolver.class.getClassLoader().getResources(fileName);
      while (classPathPluginXmls.hasMoreElements()) {
        pluginXmlUrls.add(classPathPluginXmls.nextElement());
      }
    }
    catch (IOException e) {
      LOG.error("Could not resolve plugin.xml files over classloader.", e);
    }
    String classpath = System.getProperty("java.class.path");
    String[] classpathEntries = classpath.split(File.pathSeparator);
    for (String pathEntry : classpathEntries) {
      try {
        File classPathEntryFile = new File(pathEntry);
        Path classPathEntryPath = classPathEntryFile.toPath().normalize();
        if (classPathEntryPath.endsWith(Paths.get("target", "classes"))) {
          if (classPathEntryFile.isDirectory()) {
            Path pluginXmlPath = classPathEntryPath.resolve(Paths.get("..", "..", fileName)).normalize();
            File pluginXmlFile = pluginXmlPath.toFile();
            if (pluginXmlFile.exists()) {
              pluginXmlUrls.add(pluginXmlPath.toUri().toURL());
            }
          }
        }
      }
      catch (Exception e) {
        LOG.warn(String.format("Could not resolve '%s' under classpath entry ''.", fileName, pathEntry), e);
      }
    }
    return pluginXmlUrls;
  }
}
