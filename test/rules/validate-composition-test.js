import theredoc from 'theredoc';
import testRule from '../helpers/test-rule';
import validateComposition from '../../rules/validate-composition';

testRule(validateComposition.rule, {
  ruleName: validateComposition.ruleName,

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
      message:
        'Composition of unknown class "foo" (' +
        validateComposition.ruleName +
        ')',
      line: 2
    }
  ]
});
