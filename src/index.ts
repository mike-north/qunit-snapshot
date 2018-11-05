/// <reference types="qunit" />
/// <reference lib="dom" />

/** @packagedocumentation foo  */
export { install } from './install';
import { Snapshottable } from './snapshot';
export { Snapshot, Snapshottable } from './snapshot';
export { default as Config } from './config';

declare global {
  interface Assert {
    snapshot(value: Snapshottable, name: string): void;
  }
}
