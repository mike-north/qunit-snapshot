import './test-helpers';

QUnit.module('qunit-snapshot tests');

QUnit.test('hello', assert => {
  assert.snapshot({
    foo: 'bar',
    data: {
      key: 'value'
    }
  });
  if (typeof window !== 'undefined') {
    assert.snapshot(document.querySelector('.qunit-filter'));
  }
});
