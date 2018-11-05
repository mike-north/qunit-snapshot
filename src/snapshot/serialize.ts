import * as jsonStringify from 'json-stable-stringify';
import { Snapshot } from '.';

function serializeSnapshot(value: Snapshot): string {
  return jsonStringify(value, { space: '  ' });
}
export default serializeSnapshot;
