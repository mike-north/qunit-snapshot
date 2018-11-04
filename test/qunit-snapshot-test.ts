import hello from 'qunit-snapshot';

QUnit.module('qunit-snapshot tests');

QUnit.test('hello', assert => {
  assert.equal(hello(), 'Hello from qunit-snapshot');
});
