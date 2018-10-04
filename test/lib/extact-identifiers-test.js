import test from 'ava';
import { extractIdentifiersFromContent as extract } from '../../lib/extract-identifiers';

function macro(t, expected, css) {
  const result = extract(css);

  t.deepEqual(result, expected);
}

// prettier-ignore
test('it extracts classes', macro, ['foo', 'bar'], `
  .foo {}
  .bar {}
`);

// prettier-ignore
test('it ignores IDs', macro, [], `
  #bar {}
`);

// prettier-ignore
test('it ignores elements', macro, [], `
  a {}
`);

// prettier-ignore
test('it recognizes a class with a child selector', macro, ['foo'], `
  .foo .bar {}
`);

// prettier-ignore
test('it recognizes a class with a direct child selector', macro, ['foo'], `
  .foo > .bar {}
`);
