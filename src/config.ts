import { Snapshot } from './snapshot';

/**
 * Configuration object for qunit-snapshot
 * @public
 */
export default interface Config {
  loadSnapshots?: () => Promise<boolean>;
  getSnapshot: (
    module: string | undefined,
    test: string,
    snapName: string
  ) => Snapshot | void;
  saveSnapshot?: (
    module: string | undefined,
    test: string,
    snapName: string,
    serializedSnap: string
  ) => Promise<any>;
}
