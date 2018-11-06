/// <reference types="qunit" />
/// <reference lib="dom" />

/** @packagedocumentation foo  */
import Config from './config';
import { Snapshottable, snapshot } from './snapshot';
export { Snapshot, Snapshottable } from './snapshot';
export { default as Config } from './config';

declare global {
  interface Assert {
    snapshot(value: Snapshottable, name: string): void;
  }
}

/**
 * Setup qunit-snapshot
 * @param qunit - QUnit namespace object
 * @param cfg - snapshot configuration
 * @public
 */
export function setupSnapshots(qunit: QUnit = QUnit, cfg: Config) {
  qunit.assert.snapshot = (value: Snapshottable, name: string) => {
    snapshot(qunit, cfg, value, name);
  };
  if (cfg.loadSnapshots && !cfg.loadSnapshots()) {
    throw new Error('problem loading snapshots');
  }
}

/**
 * Setup qunit-snapshot
 * @param qunit - QUnit namespace object
 * @param cfg - snapshot configuration
 * @public
 * @deprecated
 */
export function install(qunit: QUnit = QUnit, cfg: Config) {
  // tslint:disable-next-line:no-console
  console.warn(
    'qunit-snapshots - `install` is deprecated. Please use `setupSnapshots` instead'
  );
  return setupSnapshots(qunit, cfg);
}
