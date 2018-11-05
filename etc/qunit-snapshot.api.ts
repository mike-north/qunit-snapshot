// @public
interface Config {
  // (undocumented)
  getSnapshot: (module: string | undefined, test: string, snapName: string) => Snapshot | void;
  // (undocumented)
  loadSnapshots?: () => Promise<boolean>;
  // (undocumented)
  saveSnapshot?: (module: string | undefined, test: string, snapName: string, serializedSnap: string) => Promise<any>;
}

// @public
export function install(qunit: QUnit | undefined, cfg: Config): void;

// WARNING: Unsupported export: Snapshot
// WARNING: Unsupported export: Snapshottable
