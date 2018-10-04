const stylelint = require("stylelint");
const parseIdentifiers = require("../lib/parse-identifiers");

const RULE_NAME = "css-modules/validate-composition";
const PROP = "composes";
const START_COLUMN = 3 + `${PROP} `.length;

module.exports = stylelint.createPlugin(RULE_NAME, () => (root, result) => {
  root.walkRules(rule => {
    rule.walkDecls(decl => {
      if (decl.prop === PROP) {
        const { identifiers, from } = parseIdentifiers(decl.value);

        if (!from) {
          const selectors = decl
            .root()
            .nodes.filter(n => n.type === "rule")
            .map(n => n.selector)
            .map(s => s.substr(1, s.length));

          for (let identifier of identifiers) {
            if (!selectors.includes(identifier)) {
              stylelint.utils.report({
                message: `Composition of unknown class "${identifier}" (${RULE_NAME})`,
                ruleName: RULE_NAME,
                result,
                node: decl
              });
            }
          }
        }
      }
    });
  });
});
