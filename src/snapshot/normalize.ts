import { Value as JSONValue } from 'json-typescript';
import { AbbrevAlement, Snapshot } from '.';

function valueToSnapshot(value: JSONValue): Snapshot;
function valueToSnapshot(value: AbbrevAlement): Snapshot;
function valueToSnapshot(value: any): Snapshot {
  if (typeof value.outerHTML === 'string') {
    return elementToSnapshot(value);
  } else {
    try {
      return jsonToSnapshot(value);
    } catch (err) {
      return otherToSnapshot(value);
    }
  }
}

function jsonToSnapshot(value: JSONValue): Snapshot {
  if (typeof value === 'object') return value;
  else {
    return otherToSnapshot(value);
  }
}
function elementToSnapshot(value: AbbrevAlement): Snapshot {
  return value.outerHTML;
}
function otherToSnapshot(value: any): Snapshot {
  return '' + value;
}

export default valueToSnapshot;
