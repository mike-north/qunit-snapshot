import { Value as JSONValue } from 'json-typescript';
import Config from '../config';
import { currentQUnitModule } from '../qunit-utils';
import { compareSnapshots } from './compare';
import normalizeSnapshot from './normalize';
import serializeSnapshot from './serialize';

export { default as serializeSnapshot } from './serialize';
export { default as normalizeSnapshot } from './normalize';

export type AbbrevAlement = Pick<Element, 'outerHTML'>;

export type Snapshot = JSONValue;
export type Snapshottable = JSONValue | AbbrevAlement;

export function snapshot(
  qunit: QUnit,
  cfg: Config,
  value: Snapshottable,
  name: string
): void {
  const { saveSnapshot } = cfg;
  const current = currentQUnitModule(qunit);
  const moduleName = current.name;
  const testName = qunit.config.current.testName;
  const expected = cfg.getSnapshot(
    current.name,
    qunit.config.current.testName,
    name
  );
  const snap: Snapshot = normalizeSnapshot(value, cfg);
  if (!expected) {
    if (!saveSnapshot) {
      throw new Error(
        'No saveSnapshot defined in configuration. This would be valid, except a missing snapshot was encountered!'
      );
    }
    // create a new snapshot
    qunit.assert.ok(
      saveSnapshot(moduleName, testName, name, serializeSnapshot(snap, cfg)),
      'new snapshot created'
    );
  } else {
    // compare to existing snapshot
    if (!compareSnapshots(expected, snap, qunit.assert)) {
      qunit.assert.ok(true, 'snapshot matched');
    }
  }
}
