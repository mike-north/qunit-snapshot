import { Snapshot } from './snapshot';

export type TestId = string;
export type ModuleId = string;

type SnapshotStore<MID extends string, TID extends string> = {
  [MM in MID]: { [TT in TID]: Snapshot | undefined }
};

interface CurrentModule {
  name: string;
  moduleId: string;
  snapshots: SnapshotStore<ModuleId, TestId>;
}

declare global {
  interface Config {
    currentModule: CurrentModule;
  }
}

export function currentQUnitModule(qunit: QUnit): CurrentModule {
  return qunit.config.current.module;
}
