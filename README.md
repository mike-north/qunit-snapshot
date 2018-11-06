# qunit-snapshot

Snapshot-based assertions for QUnit test suites

[![Build Status](https://travis-ci.org/mike-north/qunit-snapshot.svg?branch=master)](https://travis-ci.org/mike-north/qunit-snapshot)
[![codecov](https://codecov.io/gh/mike-north/qunit-snapshot/branch/master/graph/badge.svg)](https://codecov.io/gh/mike-north/qunit-snapshot)
[![Version](https://img.shields.io/npm/v/qunit-snapshot.svg)](https://www.npmjs.com/package/qunit-snapshot)

## Setup

First, install this library in your project as a `devDependency`

```
yarn add -D qunit-snapshot
```

then, before running your tests, setup the plugin

```ts
import { setupSnapshots } from 'qunit-snapshot';

// It is your responsibility to implement these two functions
setupSnapshots(QUnit, {
  getSnapshot(
    moduleName?: string|undefined,
    testName: string,
    snapName: string) { ... }
  saveSnapshot(
    module?: string | undefined,
    test: string,
    snapName: string,
    serializedSnap: string) { ... }
})
```

Now in your tests, there's an extra method you can invoke on the `assert` object

```ts
QUnit.module('my test module');

QUnit.test('my first test', assert => {
  // Snapshot an object
  assert.snapshot({
    foo: 'bar',
    data: {
      key: 'value'
    }
  });
  // Snapshot a DOM element
  const elem = document.querySelector('.qunit-filter');
  assert.snapshot(elem);
});
```

If these snapshots don't yet exist, they'll be created (via your `saveSnapshot` hook). If existing snapshots are already found to exist (via your `getSnapshot` hook), assertions will be made to ensure the found value and expected value are deepEqual.

## Example

As an example, the following configuration would use localstorage to store snapshot data. This file should be run before any tests.

```ts
import { install } from 'qunit-snapshot';
import { Snapshot } from 'qunit-snapshot';

function snapKey(
  moduleName: string,
  testName: string,
  snapName: string
): string {
  return ['snap', moduleName || '', testName, snapName]
    .map(k => k.replace(/[^A-Za-z0-9\-\_]+/, ''))
    .join('-');
}

install(QUnit, {
  getSnapshot(
    moduleName: string,
    testName: string,
    snapName: string
  ): Snapshot | undefined {
    // Create a key for localstorage like `snap-mymodule-mytest-1`
    const key = snapKey(moduleName, testName, snapName);
    // Attempt to retrieve an existing snapshot from localStorage
    const data = localStorage.getItem(key);
    if (!data) return; // If nothing is found, we return undefined
    // Try to regard the snapshot as a JSON value,
    let jData: any;
    try {
      jData = JSON.parse(data);
      return jData; // JSON parse worked, return the value
    } catch {
      // If parsing fails, but the raw value is truthy
      if (data) {
        return data; // return it directly
      }
      return; // Raw data was falsy. This is unreachable code anyway
    }
  },
  saveSnapshot(
    moduleName: string,
    testName: string,
    snapName: string,
    serializedSnap: string
  ): boolean {
    // Create a key for localstorage like `snap-mymodule-mytest-1`
    const key = snapKey(moduleName, testName, snapName);
    // Place the value in localStorage
    localStorage.setItem(key, serializedSnap);
    return true; // indicate success
  }
});
```

---

(c) 2018 LinkedIn
