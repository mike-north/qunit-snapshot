import { compareSnapshots } from './compare';
import { ModuleId, TestId, currentQUnitModule } from './qunit-utils';
import {
  Snapshot,
  Snapshottable,
  normalizeSnapshot,
  serializeSnapshot
} from './snapshot';
export { Snapshot } from './snapshot';

/// <reference types="qunit" />
/// <reference lib="dom" />

declare global {
  interface Assert {
    snapshot(value: Snapshottable, name: string): void;
  }
}

export interface Config {
  loadSnapshots?: () => Promise<boolean>;
  getSnapshot: (
    module: ModuleId | undefined,
    test: TestId,
    snapName: string
  ) => Snapshot | void;
  saveSnapshot?: (
    module: ModuleId | undefined,
    test: TestId,
    snapName: string,
    serializedSnap: string
  ) => Promise<any>;
}

export function install(qunit: QUnit = QUnit, cfg: Config) {
  qunit.assert.snapshot = (value: Snapshottable, name: string) => {
    snapshot(qunit, cfg, value, name);
  };
  if (cfg.loadSnapshots && !cfg.loadSnapshots()) {
    throw new Error('problem loading snapshots');
  }

  qunit.moduleStart(() => {
    assertCount = 0;
  });
  qunit.log(() => {
    assertCount++;
  });
}

let assertCount = 0;

function snapshot(
  qunit: QUnit,
  cfg: Config,
  value: Snapshottable,
  name: string
): void {
  const { saveSnapshot } = cfg;
  const current = currentQUnitModule(qunit);
  const moduleName = current.name;
  const testName = qunit.config.current.testName;
  const expected = cfg.getSnapshot(
    current.name,
    qunit.config.current.testName as TestId,
    name || `${assertCount}`
  );
  const snap: Snapshot = normalizeSnapshot(value);
  if (!expected) {
    if (!saveSnapshot) {
      throw new Error(
        'No saveSnapshot defined in configuration. This would be valid, except a missing snapshot was encountered!'
      );
    }
    // create a new snapshot
    qunit.assert.ok(
      saveSnapshot(moduleName, testName, name, serializeSnapshot(snap)),
      'new snapshot created'
    );
  } else {
    // compare to existing snapshot
    if (!compareSnapshots(expected, snap, qunit.assert)) {
      qunit.assert.ok(true, 'snapshot matched');
    }
  }
}
