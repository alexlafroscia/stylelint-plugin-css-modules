import test from 'ava';
import isRelativePath from '../../lib/is-relative-path';

test('a root path', t => {
  t.false(isRelativePath('foo/bar.css'));
});

test('a relative path', t => {
  t.true(isRelativePath('./foo.css'));
  t.true(isRelativePath('../foo.css'));
});

test('an absolute path', t => {
  t.false(isRelativePath('/foo/bar.css'));
});
