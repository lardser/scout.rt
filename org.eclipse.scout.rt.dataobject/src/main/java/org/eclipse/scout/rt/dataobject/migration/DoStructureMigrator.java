/*
 * Copyright (c) 2010-2021 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */
package org.eclipse.scout.rt.dataobject.migration;

import static org.eclipse.scout.rt.platform.util.Assertions.assertNotNull;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.eclipse.scout.rt.dataobject.IDataObject;
import org.eclipse.scout.rt.dataobject.IDataObjectMapper;
import org.eclipse.scout.rt.platform.ApplicationScoped;
import org.eclipse.scout.rt.platform.BEANS;
import org.eclipse.scout.rt.platform.namespace.NamespaceVersion;
import org.eclipse.scout.rt.platform.util.CollectionUtility;

/**
 * Main class for data object migration.
 * <p>
 * Example usage:
 *
 * <pre>
 * DoStructureMigrationContext ctx = BEANS.get(DoStructureMigrationContext.class);
 * DoStructureMigratorResult<ExampleDo> result = BEANS.get(DoStructureMigrator.class).migrateDataObject(ctx, rawContent, ExampleDo.class);
 * ctx.getStats().printStats("example", 1);
 * </pre>
 */
@ApplicationScoped
// TODO 23.1 [data object migration] rename to DataObjectMigrator
public class DoStructureMigrator {

  /**
   * Migrates the data object provided by string (UTF-8 encoded) and casts it to the given data object class.
   *
   * @return Result with typed data object and a flag if a migration was applied.
   */
  public <T extends IDataObject> DoStructureMigratorResult<T> migrateDataObject(DoStructureMigrationContext ctx, String json, Class<T> valueType) {
    assertNotNull(json, "json is required");
    return migrateDataObject(ctx, new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8)), valueType);
  }

  /**
   * Migrates the data object provided by input stream and casts it to the given data object class.
   *
   * @return Result with typed data object and a flag if a migration was applied.
   */
  public <T extends IDataObject> DoStructureMigratorResult<T> migrateDataObject(DoStructureMigrationContext ctx, InputStream inputStream, Class<T> valueType) {
    assertNotNull(inputStream, "inputStream is required");
    IDataObjectMapper dataObjectMapper = BEANS.get(IDataObjectMapper.class);
    IDataObject dataObject = dataObjectMapper.readValueRaw(inputStream);
    return migrateDataObject(ctx, dataObject, valueType);
  }

  /**
   * Migrates the data object provided as raw data object and casts it to the given data object class.
   * <p>
   * Uses latest version to migrate to. Uses no initial local context data.
   *
   * @return Result with typed data object and a flag if a migration was applied.
   */
  public <T extends IDataObject> DoStructureMigratorResult<T> migrateDataObject(DoStructureMigrationContext ctx, IDataObject dataObject, Class<T> valueType) {
    assertNotNull(valueType, "valueType is required");
    return migrateDataObject(ctx, dataObject, valueType, (IDoStructureMigrationLocalContextData[]) null);
  }

  /**
   * Migrates the raw data object.
   * <p>
   * Uses latest version to migrate to. Uses given initial local context data during execution.
   *
   * @return Result with typed data object and a flag if a migration was applied.
   */
  public <T extends IDataObject> DoStructureMigratorResult<T> migrateDataObject(DoStructureMigrationContext ctx, IDataObject dataObject, Class<T> valueType, IDoStructureMigrationLocalContextData... initialLocalContextData) {
    return migrateDataObject(ctx, dataObject, valueType, null /* latest version */, initialLocalContextData == null ? Collections.emptyList() : Arrays.asList(initialLocalContextData), Collections.emptyList());
  }

  /**
   * @deprecated Use
   *             {@link #migrateDataObject(DoStructureMigrationContext, IDataObject, Class, NamespaceVersion, List, List)}
   *             instead.
   */
  @Deprecated
  public <T extends IDataObject> DoStructureMigratorResult<T> migrateDataObject(DoStructureMigrationContext ctx, IDataObject dataObject, Class<T> valueType, NamespaceVersion toVersion,
      IDoStructureMigrationLocalContextData... initialLocalContextData) {
    return migrateDataObject(ctx, dataObject, valueType, toVersion, initialLocalContextData == null ? Collections.emptyList() : Arrays.asList(initialLocalContextData), Collections.emptyList());
  }

  /**
   * Migrates the raw data object.
   * <p>
   * Uses latest version to migrate to. Uses given initial local context data and given intermediate migrations during
   * execution.
   *
   * @return Result with typed data object and a flag if a migration was applied.
   */
  public <T extends IDataObject> DoStructureMigratorResult<T> migrateDataObject(
      DoStructureMigrationContext ctx,
      IDataObject dataObject,
      Class<T> valueType,
      List<IDoStructureMigrationLocalContextData> initialLocalContextData,
      List<IDataObjectIntermediateMigration<T>> localIntermediateMigrations) {
    return migrateDataObject(ctx, dataObject, valueType, null /* latest version */, initialLocalContextData, localIntermediateMigrations);
  }

  /**
   * <b>ATTENTION:</b> use {@link #migrateDataObject(DoStructureMigrationContext, IDataObject, Class)} or
   * {@link #migrateDataObject(DoStructureMigrationContext, IDataObject, Class, IDoStructureMigrationLocalContextData...)}
   * instead. Only use this for tests and very special cases.
   * <p>
   * Migrates the raw data object.
   *
   * @param dataObject
   *          Raw data object, might be a partial non-raw data object (i.e. _type info on certain entities). Only raw
   *          data object parts are migrated.
   * @param valueType
   *          The migrated object is converted to {@code valueType}. Can be {@link IDataObject} or a more specific
   *          sub-class.
   * @param toVersion
   *          Versions to migrate to, <code>null</code> if migrating to latest version.
   * @param initialLocalContextData
   *          Initial local context data to use.
   * @param localIntermediateMigrations
   *          Local intermediate migrations to use for this data object. These intermediate migrations will be applied
   *          after the intermediate migrations defined on the {@link DoStructureMigrationContext}.
   */
  public <T extends IDataObject> DoStructureMigratorResult<T> migrateDataObject(
      DoStructureMigrationContext ctx,
      IDataObject dataObject,
      Class<T> valueType,
      NamespaceVersion toVersion,
      List<IDoStructureMigrationLocalContextData> initialLocalContextData,
      List<IDataObjectIntermediateMigration<T>> localIntermediateMigrations) {
    assertNotNull(ctx, "ctx is required");
    assertNotNull(dataObject, "dataObject is required");

    // Copy context to work on own stack for local context data.
    // Local context may be initialized via initialLocalContextData.
    DoStructureMigrationContext ctxCopy = ctx.copy().withInitialLocalContext(initialLocalContextData);
    DoStructureMigrationStatsContextData stats = ctxCopy.getStats();
    IDoStructureMigrationLogger logger = ctxCopy.getLogger();

    long start = System.nanoTime();

    stats.incrementDataObjectsProcessed();
    logger.trace("Data object before migration: {}", dataObject);

    // Apply structure migration
    boolean structureChanged = applyStructureMigration(ctxCopy, dataObject, toVersion);
    if (structureChanged) {
      ctx.getLogger().trace("Data object after structure migration: {}", dataObject);
    }

    // Convert to typed object
    IDataObjectMapper dataObjectMapper = BEANS.get(IDataObjectMapper.class);
    String migratedJson = dataObjectMapper.writeValue(dataObject);
    T typedDataObject = dataObjectMapper.readValue(migratedJson, valueType);

    // Apply intermediate migrations on typed data object (if any), start with global (defined on context) and continue with local (provided as method parameter)
    List<IDataObjectIntermediateMigration<T>> allIntermediateMigrations = CollectionUtility.combine(ctx.getIntermediateMigrations().all(valueType), localIntermediateMigrations);
    boolean intermediateChanged = false;
    for (IDataObjectIntermediateMigration<T> intermediateMigration : allIntermediateMigrations) {
      DoStructureMigratorResult<?> result = intermediateMigration.applyMigration(ctx, typedDataObject);
      intermediateChanged |= result.isChanged();
      // Always use the (new) typed data object, even if not marked as changed.
      // There might be intermediate migrations that might do some form of normalization but don't want to mark it as changed only due to that.
      //noinspection unchecked
      typedDataObject = (T) result.getDataObject();
    }

    if (intermediateChanged) {
      logger.trace("Data object after intermediate migrations: {}", typedDataObject);
    }

    // Apply value migration
    DoStructureMigratorResult<T> result = applyValueMigration(ctxCopy, typedDataObject);
    boolean valueChanged = result.isChanged();
    T migratedDataObject = result.getDataObject();
    if (valueChanged) {
      logger.trace("Data object after value migration: {}", migratedDataObject);
    }

    boolean objectChanged = structureChanged || intermediateChanged || valueChanged;
    if (objectChanged) {
      stats.incrementDataObjectsChanged();
    }
    stats.addMigrationDuration(start);

    return DoStructureMigratorResult.of(migratedDataObject, objectChanged);
  }

  protected boolean applyStructureMigration(DoStructureMigrationContext ctx, IDataObject dataObject, NamespaceVersion toVersion) {
    Map<String, NamespaceVersion> typeVersions = BEANS.get(DoStructureMigrationHelper.class).collectRawDataObjectTypeVersions(dataObject);
    if (typeVersions.isEmpty()) {
      ctx.getLogger().debug("No data object entities with a type name found within {}", dataObject);
      return false;
    }

    List<NamespaceVersion> versions = BEANS.get(DoStructureMigrationInventory.class).getVersions(typeVersions, toVersion);
    if (versions.isEmpty()) {
      return false;
    }

    // Apply data object structure migrations
    boolean structureChanged = false;
    for (NamespaceVersion version : versions) {
      DoStructureMigrationDataObjectVisitor visitor = createStructureMigrationVisitor(ctx, version);
      visitor.migrate(dataObject);
      structureChanged |= visitor.isChanged();
    }
    ctx.getLogger().debug("Applied structure migrations [{} -> {}] on {}", CollectionUtility.firstElement(versions), CollectionUtility.lastElement(versions), dataObject);

    return structureChanged;
  }

  protected DoStructureMigrationDataObjectVisitor createStructureMigrationVisitor(DoStructureMigrationContext ctx, NamespaceVersion version) {
    return new DoStructureMigrationDataObjectVisitor(ctx, version);
  }

  protected <T extends IDataObject> DoStructureMigratorResult<T> applyValueMigration(DoStructureMigrationContext ctx, T dataObject) {
    // Applied value migration IDs should be explicitly set to an empty set, if all value migrations actually should be applied.
    // A null value indicates a caller which is unaware of value migrations - skip value migrations.
    if (ctx.getGlobal(DoValueMigrationIdsContextData.class).getAppliedValueMigrationIds() == null) {
      return DoStructureMigratorResult.of(dataObject, false);
    }

    DoValueMigrationDataObjectVisitor valueMigrationVisitor = createValueMigrationVisitor(ctx);
    T migratedDataObject = valueMigrationVisitor.migrate(dataObject);
    return DoStructureMigratorResult.of(migratedDataObject, valueMigrationVisitor.isChanged());
  }

  protected DoValueMigrationDataObjectVisitor createValueMigrationVisitor(DoStructureMigrationContext ctx) {
    return new DoValueMigrationDataObjectVisitor(ctx);
  }

  // TODO 23.1 [data object migration] rename to DataObjectMigrationResult
  public static class DoStructureMigratorResult<T extends IDataObject> {

    private T m_dataObject;
    private boolean m_changed;

    /**
     * @deprecated Use {@link #of(IDataObject, boolean)} instead.
     */
    // TODO 23.1 [sme] private constructor
    @Deprecated
    public DoStructureMigratorResult(T dataObject, boolean changed) {
      m_dataObject = dataObject;
      m_changed = changed;
    }

    public static <T extends IDataObject> DoStructureMigratorResult<T> of(T dataObject, boolean changed) {
      return new DoStructureMigratorResult<>(dataObject, changed);
    }

    public T getDataObject() {
      return m_dataObject;
    }

    public boolean isChanged() {
      return m_changed;
    }
  }

  // ======================================================================
  // TODO 23.1 [data object migration] remove following deprecated methods

  /**
   * @deprecated see:
   *             {@link #migrateDataObject(DoStructureMigrationContext, IDataObject, NamespaceVersion, IDoStructureMigrationLocalContextData...)}
   */
  @Deprecated
  public boolean migrateDataObject(DoStructureMigrationContext ctx, IDataObject dataObject) {
    return migrateDataObject(ctx, dataObject, (NamespaceVersion) null /* latest version */);
  }

  /**
   * @deprecated see:
   *             {@link #migrateDataObject(DoStructureMigrationContext, IDataObject, NamespaceVersion, IDoStructureMigrationLocalContextData...)}
   */
  @Deprecated
  public boolean migrateDataObject(DoStructureMigrationContext ctx, IDataObject dataObject, IDoStructureMigrationLocalContextData... initialLocalContextData) {
    return migrateDataObject(ctx, dataObject, (NamespaceVersion) null /* latest version */, initialLocalContextData);
  }

  /**
   * This method only applies structure migrations. If this is the desired behavior, e.g. for unit tests, use
   * {@link #applyStructureMigration(DoStructureMigrationContext, IDataObject, NamespaceVersion)} or call one of the
   * {@code migrateDataObject()} methods which will apply both structure and value migrations and will return a typed
   * data object.
   *
   * @deprecated use {@link #applyStructureMigration(DoStructureMigrationContext, IDataObject, NamespaceVersion)}
   *             instead. For unit tests, use {code TestDoStructureMigrator#applyStructureMigration}
   */
  @Deprecated
  public boolean migrateDataObject(DoStructureMigrationContext ctx, IDataObject dataObject, NamespaceVersion toVersion, IDoStructureMigrationLocalContextData... initialLocalContextData) {
    DoStructureMigrationContext ctxCopy = ctx.copy().withInitialLocalContext(initialLocalContextData == null ? Collections.emptyList() : Arrays.asList(initialLocalContextData));
    return applyStructureMigration(ctxCopy, dataObject, toVersion);
  }
}
