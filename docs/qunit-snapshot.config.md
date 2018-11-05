[Home](./index) &gt; [qunit-snapshot](./qunit-snapshot.md) &gt; [Config](./qunit-snapshot.config.md)

# Config interface

Configuration object for qunit-snapshot

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [`getSnapshot`](./qunit-snapshot.config.getsnapshot.md) | `(module: string | undefined, test: string, snapName: string) => Snapshot | void` |  |
|  [`loadSnapshots`](./qunit-snapshot.config.loadsnapshots.md) | `() => Promise<boolean>` |  |
|  [`saveSnapshot`](./qunit-snapshot.config.savesnapshot.md) | `(module: string | undefined, test: string, snapName: string, serializedSnap: string) => Promise<any>` |  |

