import { currentQUnitModule, TestId, ModuleId } from './qunit-utils';
import { compareSnapshots } from './compare';
import {
  Snapshottable,
  Snapshot,
  serializeSnapshot,
  normalizeSnapshot
} from './snapshot';
export { Snapshot } from './snapshot';

/// <reference types="qunit" />
/// <reference lib="dom" />

declare global {
  interface Assert {
    snapshot(value: Snapshottable): void;
  }
}

export interface Config {
  loadSnapshots(): boolean;
  getSnapshot(
    module: ModuleId | undefined,
    test: TestId,
    snapName: string
  ): Snapshot | undefined;
  saveSnapshot(
    module: ModuleId | undefined,
    test: TestId,
    snapName: string,
    serializedSnap: string
  ): boolean;
}

export function install(qunit: QUnit = QUnit, cfg: Config) {
  qunit.assert.snapshot = (value: Snapshottable, name?: string) => {
    snapshot(qunit, cfg, value, name);
  };
  if (!cfg.loadSnapshots()) {
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
  name?: string
): void {
  const current = currentQUnitModule(qunit);
  const expected = cfg.getSnapshot(
    current.name as ModuleId,
    qunit.config.current.testName as TestId,
    name || `${assertCount}`
  );
  const snap: Snapshot = normalizeSnapshot(value);
  if (!expected) {
    // create a new snapshot
    qunit.assert.ok(
      cfg.saveSnapshot(
        current.name,
        qunit.config.current.testName,
        name || `${assertCount}`,
        serializeSnapshot(snap)
      ),
      'new snapshot created'
    );
  } else {
    // compare to existing snapshot
    if (!compareSnapshots(expected, snap, qunit.assert)) {
      qunit.assert.ok(true, 'snapshot matched');
    }
  }
}
