/**
 * Returns whether or not a string looks like a relative file path
 *
 * @param {string} inputPath
 */
function isRelativePath(inputPath) {
  return inputPath.indexOf('./') == 0 || inputPath.indexOf('../') === 0;
}

module.exports = isRelativePath;
