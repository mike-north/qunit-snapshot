import Config from './config';
import { currentQUnitModule } from './qunit-utils';
import {
  Snapshot,
  Snapshottable,
  normalizeSnapshot,
  serializeSnapshot
} from './snapshot';
import { compareSnapshots } from './snapshot/compare';

/**
 * Setup qunit-snapshot
 * @param qunit - QUnit namespace object
 * @param cfg - snapshot configuration
 * @public
 */
export function install(qunit: QUnit = QUnit, cfg: Config) {
  qunit.assert.snapshot = (value: Snapshottable, name: string) => {
    snapshot(qunit, cfg, value, name);
  };
  if (cfg.loadSnapshots && !cfg.loadSnapshots()) {
    throw new Error('problem loading snapshots');
  }
}

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
    qunit.config.current.testName,
    name
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
