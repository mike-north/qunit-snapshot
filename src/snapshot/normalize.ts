import { Value as JSONValue } from 'json-typescript';
import { AbbrevAlement, Snapshot } from '.';
import Config from '../config';

function normalizeSnapshot(
  value: JSONValue | AbbrevAlement,
  cfg: Config
): Snapshot;
function normalizeSnapshot(value: any, cfg: Config): Snapshot {
  if (typeof value.outerHTML === 'string') {
    return elementToSnapshot(value, cfg);
  } else {
    try {
      return jsonToSnapshot(value, cfg);
    } catch (err) {
      return otherToSnapshot(value, cfg);
    }
  }
}

function jsonToSnapshot(value: JSONValue, cfg: Config): Snapshot {
  if (typeof value === 'object') return value;
  else {
    return otherToSnapshot(value, cfg);
  }
}
function elementToSnapshot(value: AbbrevAlement, cfg: Config): Snapshot {
  const { sanitize } = cfg;
  if (!sanitize) return value.outerHTML;
  return sanitize('element', value.outerHTML);
}
function otherToSnapshot(value: any, _cfg: Config): Snapshot {
  return '' + value;
}

export default normalizeSnapshot;
