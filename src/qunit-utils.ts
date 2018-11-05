interface CurrentModule {
  name: string;
  moduleId: string;
}

declare global {
  interface Config {
    currentModule: CurrentModule;
  }
}

export function currentQUnitModule(qunit: QUnit): CurrentModule {
  return qunit.config.current.module;
}
