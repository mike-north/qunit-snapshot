import { Config, Snapshot, install } from 'qunit-snapshot';

const BROWSER_CONFIG: Config = {
  getSnapshot(
    moduleName: string | undefined,
    testName: string,
    snapName: string
  ): Snapshot | undefined {
    const key = ['snap', moduleName || '', testName, snapName]
      .map(k => k.replace(/[^A-Za-z0-9\-\_]+/, ''))
      .join('-');
    const data = localStorage.getItem(key);
    if (!data) return;
    let jData: any;
    try {
      jData = JSON.parse(data);
      return jData;
    } catch {
      if (data && !jData) {
        return { value: data };
      }
      return;
    }
  },
  saveSnapshot(
    moduleName: string | undefined,
    testName: string,
    snapName: string,
    serializedSnap: string
  ): Promise<any> {
    const key = ['snap', moduleName || '', testName, snapName]
      .map(k => k.replace(/[^A-Za-z0-9\-\_]+/, ''))
      .join('-');
    localStorage.setItem(key, serializedSnap);
    return Promise.resolve();
  }
};
const NODE_CONFIG: Config = (() => {
  const DATA: { [k: string]: string } = {};
  return {
    getSnapshot(
      moduleName: string | undefined,
      testName: string,
      snapName: string
    ): Snapshot | undefined {
      const key = ['snap', moduleName || '', testName, snapName]
        .map(k => k.replace(/[^A-Za-z0-9\-\_]+/, ''))
        .join('-');
      const data = DATA[key];
      if (!data) return;
      let jData: any;
      try {
        jData = JSON.parse(data);
        return jData;
      } catch {
        if (data && !jData) {
          return { value: data };
        }
        return;
      }
    },
    saveSnapshot(
      moduleName: string | undefined,
      testName: string,
      snapName: string,
      serializedSnap: string
    ): Promise<any> {
      const key = ['snap', moduleName || '', testName, snapName]
        .map(k => k.replace(/[^A-Za-z0-9\-\_]+/, ''))
        .join('-');
      DATA[key] = serializedSnap;
      return Promise.resolve();
    }
  };
})();

const cfg = typeof window !== 'undefined' ? BROWSER_CONFIG : NODE_CONFIG;

install(QUnit, cfg);
