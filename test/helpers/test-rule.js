/**
 * Borrowed from example code in `stylelint-test-rule-tape`
 *
 * @see https://github.com/stylelint/stylelint-test-rule-tape/blob/6279a6512269720e737aa06490a6bf8f4d27fa31/index.js#L24-L38
 */
const stylelint = require('stylelint');
const test = require('ava');

function assertEquality(processCss, context) {
  const testFn = context.only ? test.only : test;
  testFn(context.caseDescription, t => {
    return processCss.then(comparisons => {
      comparisons.forEach(({ actual, expected, description }) => {
        t.is(actual, expected, description);
      });
    });
  });
}

module.exports = stylelint.createRuleTester(assertEquality);
