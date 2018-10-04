const path = require('path');

const postcss = require('postcss');
const stylelint = require('stylelint');

const readFile = require('../../lib/read-file');

async function lintFile(pathToFixture, config) {
  const linter = postcss([
    stylelint({
      // configBasedir: __dirname,
      config: {
        plugins: [path.resolve(__dirname, '../../index.js')],
        ...config
      }
    })
  ]);

  const relativeFixturePath = path.resolve(
    __dirname,
    '../fixtures',
    pathToFixture
  );

  const fileContent = await readFile(relativeFixturePath, 'utf8');

  const { messages } = await linter.process(fileContent, {
    from: relativeFixturePath
  });

  return messages;
}

module.exports = lintFile;
