import Config from './config';
import { Snapshottable, snapshot } from './snapshot';

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
