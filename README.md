# stylelint-plugin-css-modules

[![Build Status](https://travis-ci.com/alexlafroscia/stylelint-plugin-css-modules.svg?branch=master)](https://travis-ci.com/alexlafroscia/stylelint-plugin-css-modules)

> A stylelint plugin for CSS Modules

This [`stylelint`][stylelint] plugin provides rules to help you use [CSS Modules][css-modules] correctly.

## Installation

TBD

## Rules

### `validate-composition`

This rule will look at `composes` declarations in your CSS files and try to ensure that the classes you're composing are actually valid.

Right now, it can only validate composition of classes in the same file, but the behavior will be expanded to support imports from other files as well.

[stylelint]: https://stylelint.io/
[css-modules]: https://github.com/css-modules/css-modules
