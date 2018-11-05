// tslint:disable-next-line:no-commented-code
// import * as jsonStringify from 'json-stable-stringify';
import { Snapshot } from '.';

function serializeSnapshot(value: Snapshot): string {
  return JSON.stringify(value, null, '  ');
}
export default serializeSnapshot;
