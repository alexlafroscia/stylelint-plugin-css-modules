const postcss = require('postcss');
const readFile = require('./read-file');

/**
 * @param {object} root a PostCSS tree for a file
 * @return {Array<string>} import-able identifiers in the file
 */
function extractIdentifiersFromRoot(root) {
  return root.nodes
    .filter(r => r.type === 'rule' && r.selector.indexOf('.') === 0)
    .map(r => r.selector.split(' ')[0].substr(1));
}

/**
 * @param {string} content the file content to analyze
 * @param {string} [from] path to the file being analyze
 * @return {Array<string>} import-able identifiers in the file
 */
function extractIdentifiersFromContent(content, from) {
  const options = from ? { from } : undefined;
  const result = postcss.parse(content, options);

  return extractIdentifiersFromRoot(result);
}

/**
 *
 * @param {string} path the file to read identifiers from
 * @return {Promise<Array<string>>} import-able identifiers in the file
 */
async function extractIdentifiersFromFile(path) {
  const content = await readFile(path, 'utf8');

  return extractIdentifiersFromContent(content, path);
}

module.exports = {
  extractIdentifiersFromFile,
  extractIdentifiersFromContent,
  extractIdentifiersFromRoot
};
