import { Snapshot, Snapshottable } from './snapshot';

export interface SanitizeHook {
  (type: 'element', value: string): Snapshottable;
  (type: 'other', value: any): Snapshottable;
}

/**
 * Configuration object for qunit-snapshot
 * @public
 */
export default interface Config {
  loadSnapshots?: () => Promise<boolean>;
  sanitize?: SanitizeHook;
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
