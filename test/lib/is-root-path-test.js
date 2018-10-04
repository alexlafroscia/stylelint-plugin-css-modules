import test from 'ava';
import isRootPath from '../../lib/is-root-path';

test('a root path', t => {
  t.true(isRootPath('foo/bar.css'));
});

test('a relative path', t => {
  t.false(isRootPath('./foo.css'));
  t.false(isRootPath('../foo.css'));
});

test('an absolute path', t => {
  t.false(isRootPath('/foo/bar.css'));
});
