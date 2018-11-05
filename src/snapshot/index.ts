export { default as serializeSnapshot } from './serialize';
export { default as normalizeSnapshot } from './normalize';
import { Value as JSONValue } from 'json-typescript';

export type AbbrevAlement = Pick<Element, 'outerHTML'>;

export type Snapshot = JSONValue;
export type Snapshottable = JSONValue | AbbrevAlement;
