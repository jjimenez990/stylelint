# stylelint [![NPM version](http://img.shields.io/npm/v/stylelint.svg)](https://www.npmjs.org/package/stylelint) [![Travis Build Status](https://img.shields.io/travis/stylelint/stylelint/master.svg?label=unix%20build)](https://travis-ci.org/stylelint/stylelint) [![AppVeyor Build Status](https://img.shields.io/appveyor/ci/MoOx/stylelint/master.svg?label=windows%20build)](https://ci.appveyor.com/project/MoOx/stylelint) [![Join the chat at https://gitter.im/stylelint/stylelint](https://img.shields.io/badge/gitter%20-join%20chat%20%E2%9E%9E-1dce73.svg)](https://gitter.im/stylelint/stylelint)

> Modern CSS linter.

Supports the latest CSS syntax and features, including custom properties, range media features and calc().

## Installation

```console
$ npm install stylelint
```

_The reported line numbers of some warnings may be inaccurate. See issue [#133](https://github.com/stylelint/stylelint/issues/133) for details of our progress towards resolving this._

## Usage

You must, for now, use the linter as a [PostCSS plugin](https://github.com/postcss/postcss#usage). This means you can either use a PostCSS runner, such as: [`gulp-postcss`](https://github.com/postcss/gulp-postcss), [`grunt-postcss`](https://github.com/nDmitry/grunt-postcss) and [`postcss-loader`](https://github.com/postcss/postcss-loader), or you can use the PostCSS JS API.

The linter also expects a config. You can either craft your own config or use a [pre-written one](#shareable-configs).

An example of using [`gulp-postcss`](https://github.com/postcss/gulp-postcss) and crafting your own config:

```js
gulp.task("css", function () {

  var postcss = require("gulp-postcss")
  var stylelint = require("stylelint")
  var reporter = require("postcss-reporter")

  return gulp.src("src/**/*.css")
    .pipe(postcss([
      stylelint({ // an example config that has four rules
        "rules": {
          "color-no-invalid-hex": 2,
          "declaration-colon-space-before": [2, "never"],
          "indentation": [2, "tab"],
          "number-leading-zero": [2, "always"]
        }
      }),
      reporter({
        clearMessages: true,
      })
    ]))
})
```

An example of using the JS API and the [`stylelint-config-suitcss`](https://github.com/stylelint/stylelint-config-suitcss) config:

```js
var fs = require("fs")
var postcss = require("postcss")
var stylelint = require("stylelint")
var configSuitcss = require("stylelint-config-suitcss")
var reporter = require("postcss-reporter")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

  postcss([
    stylelint(configSuitcss), // using the pre-written SuitCSS config
    reporter(),
   ])
  .process(css, { from: "input.css" })
  .then()
  .catch(err => console.error(err.stack))
```

### Configuring rules

[Rules](docs/rules.md) are configured within the `rules` key of the config.
Like [ESLint](http://eslint.org/docs/user-guide/configuring#configuring-rules), each rule can be turned off or on:

* `0` - turn the rule off.
* ~~`1` - turn the rule on as a warning (does not affect exit code).~~
* `2` - turn the rule on ~~as an error (exit code is 1 when triggered)~~.

_Severities are not yet implemented. See issue [#26](https://github.com/stylelint/stylelint/issues/26) for details of our progress._


An example of turning one rule off and another on:


```js
{
  "rules": {
    "rule-no-single-line": 0, // turn rule off
    "declaration-no-important": 2, // turn rule on
  }
}
```

Some of the rules expect options. Each of these must be explicitly configured as there are no default values.

An example of explicitly configuring the options for three rules:

```js
{
  "rules": {
    "indentation": [2, "tab", {
      except: ["value"],
    }],
    "declaration-colon-space-before": [2, "never"],
    "number-leading-zero": [2, "always"],
  }
}
```

#### Shareable configs

If you prefer to enforce a third-party styleguide (rather than craft your own config), you can use:

* [SuitCSS shareable config](https://github.com/stylelint/stylelint-config-suitcss)

You can also extend a shareable config file, starting with what's there and making your own modifications and additions:

```js
var assign = require("lodash.assign")
var configSuitcss = require("stylelint-config-suitcss")

// change indentation to tabs and turn off the number-leading-zero rule
var myConfig = {
  "rules": {
    "indentation": [2, "tab"],
    "number-leading-zero": 0,
  }
}

// merge the configs together
var config = {
  rules: assign(configSuitcss.rules, myConfig.rules)
}
```

## Requirements

* node@0.12 or io.js@2
* node@0.10 with [babel-node](http://babeljs.io/docs/usage/cli/#babel-node)

## [Changelog](CHANGELOG.md)

## [Contributing](CONTRIBUTING.md)

## [License](LICENSE)
