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

test('it extracts the file an identifier is imported from', t => {
  t.deepEqual(parseIdentifiers("foo from './foo.css'"), {
    identifiers: ['foo'],
    trailingComma: false,
    from: './foo.css'
  });

  t.deepEqual(parseIdentifiers('foo from "./foo.css"'), {
    identifiers: ['foo'],
    trailingComma: false,
    from: './foo.css'
  });

  t.deepEqual(parseIdentifiers('foo from "./foo-bar.css"'), {
    identifiers: ['foo'],
    trailingComma: false,
    from: './foo-bar.css'
  });

  t.deepEqual(parseIdentifiers('foo from "foo-bar.css"'), {
    identifiers: ['foo'],
    trailingComma: false,
    from: 'foo-bar.css'
  });

  t.deepEqual(parseIdentifiers('foo from "foo_bar.css"'), {
    identifiers: ['foo'],
    trailingComma: false,
    from: 'foo_bar.css'
  });

  t.deepEqual(parseIdentifiers('foo from "foo012.css"'), {
    identifiers: ['foo'],
    trailingComma: false,
    from: 'foo012.css'
  });

  t.deepEqual(parseIdentifiers('foo from "FOO.css"'), {
    identifiers: ['foo'],
    trailingComma: false,
    from: 'FOO.css'
  });
});

test('it extracts when an identifier is imported from `global`', t => {
  const value = parseIdentifiers('foo from global');

  t.deepEqual(value, {
    identifiers: ['foo'],
    trailingComma: false,
    from: 'global'
  });
});
