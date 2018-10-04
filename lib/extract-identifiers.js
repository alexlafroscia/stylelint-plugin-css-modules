const postcss = require('postcss');

const readFile = require('./read-file');

function extractIdentifiersFromContent(content, from) {
  const result = postcss.parse(content, {
    from
  });

  return result.nodes
    .filter(r => r.type === 'rule')
    .filter(r => r.selectors.length === 1)
    .map(r => r.selector.substr(1));
}

/**
 *
 * @param {string} path the file to read identifiers from
 * @return {Array<string>} the import-able identifiers in the file
 */
async function extractIdentifiers(path) {
  const content = await readFile(path, 'utf8');

  return extractIdentifiersFromContent(content, path);
}

module.exports = extractIdentifiers;
module.exports.extractIdentifiersFromContent = extractIdentifiersFromContent;
