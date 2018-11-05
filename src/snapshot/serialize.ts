import { Snapshot } from '.';
import Config from '../config';

function serializeSnapshot(value: Snapshot, _cfg: Config): string {
  return JSON.stringify(value, null, '  ');
}
export default serializeSnapshot;
