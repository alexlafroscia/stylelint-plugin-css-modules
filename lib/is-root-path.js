/**
 * Returns whether or not a string looks like a root file path
 *
 * @param {string} inputPath
 */
function isRootPath(inputPath) {
  return inputPath.indexOf('.') !== 0 && inputPath.indexOf('/') !== 0;
}

module.exports = isRootPath;
