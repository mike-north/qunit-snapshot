import { install } from 'qunit-snapshot';
import { Snapshot } from 'qunit-snapshot';

const BROWSER_CONFIG = {
  loadSnapshots() {
    return true;
  },
  getSnapshot(
    moduleName: string,
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
    moduleName: string,
    testName: string,
    snapName: string,
    serializedSnap: string
  ): boolean {
    const key = ['snap', moduleName || '', testName, snapName]
      .map(k => k.replace(/[^A-Za-z0-9\-\_]+/, ''))
      .join('-');
    localStorage.setItem(key, serializedSnap);
    return true;
  }
};
const NODE_CONFIG = (function() {
  const DATA: { [k: string]: string } = {};
  return {
    loadSnapshots() {
      return true;
    },
    getSnapshot(
      moduleName: string,
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
      moduleName: string,
      testName: string,
      snapName: string,
      serializedSnap: string
    ): boolean {
      const key = ['snap', moduleName || '', testName, snapName]
        .map(k => k.replace(/[^A-Za-z0-9\-\_]+/, ''))
        .join('-');
      DATA[key] = serializedSnap;
      return true;
    }
  };
})();

const cfg = typeof window !== 'undefined' ? BROWSER_CONFIG : NODE_CONFIG;

install(QUnit, cfg);
