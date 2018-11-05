import './test-helpers';

QUnit.module('qunit-snapshot tests');

QUnit.test('hello', assert => {
  assert.snapshot(
    {
      foo: 'bar',
      data: {
        key: 'value'
      }
    },
    'A JSON object'
  );
  if (typeof window !== 'undefined') {
    assert.snapshot(
      document.querySelector('.qunit-filter'),
      'QUnit filter DOM'
    );
  }
});
