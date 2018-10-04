import theredoc from "theredoc";
import testRule from "../helpers/test-rule";
import validateComposition from "../../rules/validate-composition";

testRule(validateComposition.rule, {
  ruleName: validateComposition.ruleName,
  skipBasicChecks: true,

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
        ")",
      line: 2
    }
  ]
});
