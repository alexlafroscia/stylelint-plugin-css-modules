import test from 'ava';
import theredoc from 'theredoc';
import testRule from '../helpers/test-rule';
import lintFile from '../helpers/lint-file';
import validateComposition from '../../rules/validate-composition';

const {
  makeUnknownClassMessage,
  makeMissingModuleMessage,
  ruleName
} = validateComposition;

testRule(validateComposition.rule, {
  ruleName,

  accept: [
    {
      description: 'A composing class in the same file',
      code: theredoc`
        .foo {
          color: 'red';
        }

        .bar {
          composes: foo;
        }
      `
    },
    {
      description: 'A composing class from the global',
      code: theredoc`
        .bar {
          composes: foo from global;
        }
      `
    }
  ],

  reject: [
    {
      description: 'A non-existant composing class in the same file',
      code: theredoc`
        .bar {
          composes: foo;
        }
      `,
      message: makeUnknownClassMessage('foo'),
      line: 2
    }
  ]
});

testRule(validateComposition.rule, {
  ruleName,
  skipBasicChecks: true,
  config: {
    validateRootPaths: false
  },

  accept: [
    {
      description: 'Composing class from a root file path',
      code: theredoc`
        .bar {
          composes: foo from 'foo/bar.css';
        }
      `
    }
  ]
});

testRule(validateComposition.rule, {
  ruleName,
  skipBasicChecks: true,
  config: {
    validateRootPaths: true
  },

  reject: [
    {
      description: 'Composing from an root file path',
      code: theredoc`
        .bar {
          composes: foo from 'foo/bar.css';
        }
      `,
      message: makeUnknownClassMessage('foo', 'foo/bar.css'),
      line: 2
    }
  ]
});

test('import a valid class from an existing file', async t => {
  const warnings = await lintFile(
    'validate-composition/valid-relative-import/bar.css',
    {
      rules: {
        'css-modules/validate-composition': {}
      }
    }
  );

  t.deepEqual(warnings, []);
});

test('importing an invalid class from an existing file', async t => {
  const [warning] = await lintFile(
    'validate-composition/invalid-relative-import/bar.css',
    {
      rules: {
        'css-modules/validate-composition': {}
      }
    }
  );

  t.is(warning.text, makeUnknownClassMessage('baz', './foo.css'));

  const noMessagesWhenDisabled = await lintFile(
    'validate-composition/invalid-relative-import/bar.css',
    {
      rules: {
        'css-modules/validate-composition': {
          validateRelativePaths: false
        }
      }
    }
  );

  t.deepEqual(noMessagesWhenDisabled, []);
});

test('importing a class from a missing file', async t => {
  const [warning] = await lintFile(
    'validate-composition/relative-import-missing-file/bar.css',
    {
      rules: {
        'css-modules/validate-composition': {}
      }
    }
  );

  t.is(warning.text, makeMissingModuleMessage('./foo.css'));

  const noMessagesWhenDisabled = await lintFile(
    'validate-composition/relative-import-missing-file/bar.css',
    {
      rules: {
        'css-modules/validate-composition': {
          validateRelativePaths: false
        }
      }
    }
  );

  t.deepEqual(noMessagesWhenDisabled, []);
});
