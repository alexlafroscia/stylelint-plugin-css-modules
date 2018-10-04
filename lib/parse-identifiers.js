const FROM_REGEX = /(.*)\sfrom\s(?:'|")?([a-xA-Z0-9_.\-/]*)(?:'|")?/;

function parseIdentifiers(input) {
  let identifiers,
    trailingComma = false,
    from;

  const match = input.match(FROM_REGEX);
  if (match) {
    identifiers = match[1];
    from = match[2];
  } else {
    identifiers = input;
  }

  trailingComma =
    identifiers.lastIndexOf(',') === identifiers.length - 1
      ? identifiers.lastIndexOf(',')
      : false;

  if (trailingComma) {
    identifiers = identifiers.substr(0, identifiers.length - 1);
  }

  return {
    identifiers: identifiers.split(',').map(i => i.trim()),
    trailingComma,
    from
  };
}

module.exports = parseIdentifiers;
