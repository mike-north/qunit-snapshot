import { Snapshot } from 'src/snapshot';

export interface SuccessResult {
  readonly result: 'ok';
}
export interface ErrorResult {
  readonly result: 'error';
  readonly data: unknown;
}

const SNAPSHOT_ASSERT_MESSAGE = 'snapshots should match';
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
    assert.deepEqual(found, expect, SNAPSHOT_ASSERT_MESSAGE);
    return true;
  }
  if (typeof expect === 'string' && typeof found === 'string') {
    assert.equal(
      found,
      expect.substr(1, expect.length - 2),
      SNAPSHOT_ASSERT_MESSAGE
    );
    return true;
  }
  assert.equal(found, expect, SNAPSHOT_ASSERT_MESSAGE);
  return true;
}
