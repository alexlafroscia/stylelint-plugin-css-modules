const path = require('path');
const stylelint = require('stylelint');

const asyncWalkDecls = require('../lib/async-walk-decls');
const extractIdentifiers = require('../lib/extract-identifiers');
const isRelativePath = require('../lib/is-relative-path');
const isRootPath = require('../lib/is-root-path');
const parseIdentifiers = require('../lib/parse-identifiers');

const DEFAULT_OPTIONS = {
  validateRelativePaths: true,
  validateRootPaths: false
};
const RULE_NAME = 'css-modules/validate-composition';

function makeUnknownClassMessage(identifier, from) {
  let message = `Composition of unknown class "${identifier}"`;

  if (from) {
    message = `${message} from "${from}"`;
  }

  message = `${message} (${RULE_NAME})`;

  return message;
}

function makeMissingModuleMessage(from) {
  return `Could not find module "${from}" (${RULE_NAME})`;
}

module.exports = stylelint.createPlugin(
  RULE_NAME,
  providedOptions => (root, result) => {
    const options = Object.assign({}, DEFAULT_OPTIONS, providedOptions);

    return asyncWalkDecls(root, 'composes', async decl => {
      const { identifiers, from } = parseIdentifiers(decl.value);

      if (!from) {
        const selectors = decl
          .root()
          .nodes.filter(n => n.type === 'rule')
          .map(n => n.selector)
          .map(s => s.substr(1, s.length));

        for (let identifier of identifiers) {
          if (!selectors.includes(identifier)) {
            stylelint.utils.report({
              message: makeUnknownClassMessage(identifier),
              ruleName: RULE_NAME,
              result,
              node: decl
            });
          }
        }
      } else if (from !== 'global') {
        for (const identifier of identifiers) {
          if (options.validateRootPaths && isRootPath(from)) {
            stylelint.utils.report({
              message: makeUnknownClassMessage(identifier, from),
              ruleName: RULE_NAME,
              result,
              node: decl
            });
          }

          if (options.validateRelativePaths && isRelativePath(from)) {
            const { file: filePath } = root.source.input;
            const fileDirectory = path.dirname(filePath);
            const importFilePath = path.resolve(fileDirectory, from);

            try {
              const validImportIdentifiers = await extractIdentifiers(
                importFilePath
              );

              if (!validImportIdentifiers.includes(identifier)) {
                stylelint.utils.report({
                  message: makeUnknownClassMessage(identifier, from),
                  ruleName: RULE_NAME,
                  result,
                  node: decl
                });
              }
            } catch (e) {
              if (e.code === 'ENOENT') {
                stylelint.utils.report({
                  message: makeMissingModuleMessage(from),
                  ruleName: RULE_NAME,
                  result,
                  node: decl
                });
              } else {
                throw e;
              }
            }
          }
        }
      }
    });
  }
);

module.exports.makeUnknownClassMessage = makeUnknownClassMessage;
module.exports.makeMissingModuleMessage = makeMissingModuleMessage;
