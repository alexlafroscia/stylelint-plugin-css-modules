import test from 'ava';
import parseIdentifiers from '../../lib/parse-identifiers';

test('it extracts a single identifier from a value', t => {
  const value = parseIdentifiers('foo');

  t.deepEqual(value, {
    identifiers: ['foo'],
    trailingComma: false,
    from: undefined
  });
});

test('it extracts multiple identifiers from a value', t => {
  const value = parseIdentifiers('foo, bar');

  t.deepEqual(value, {
    identifiers: ['foo', 'bar'],
    trailingComma: false,
    from: undefined
  });
});

test('it detects when the identifiers end in a comma', t => {
  const value = parseIdentifiers('foo, bar,');

  t.deepEqual(value, {
    identifiers: ['foo', 'bar'],
    trailingComma: 8,
    from: undefined
  });
});

test('it extracts where identifiers were imported from', t => {
  const value = parseIdentifiers("foo from './foo.css'");

  t.deepEqual(value, {
    identifiers: ['foo'],
    trailingComma: false,
    from: './foo.css'
  });
});
