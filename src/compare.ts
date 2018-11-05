import { Snapshot } from 'src/snapshot';

export interface SuccessResult {
  readonly result: 'ok';
}
export interface ErrorResult {
  readonly result: 'error';
  readonly data: unknown;
}

export function compareSnapshots<T extends Snapshot>(
  expect: T,
  found: T,
  assert: Assert
): boolean {
  if (typeof expect !== typeof found) {
    assert.equal(
      typeof expect,
      typeof found,
      'Types of snapshots did not match'
    );
    return false;
  }
  if (typeof expect === 'object' && typeof found === 'object') {
    assert.deepEqual(found, expect, 'snapshots should match');
    return true;
  }
  assert.equal(found, expect, 'snapshots should match');
  return true;
}
