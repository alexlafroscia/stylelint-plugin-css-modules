const fs = require('fs');
const util = require('util');

module.exports = util.promisify(fs.readFile);
