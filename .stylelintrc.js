module.exports = {
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended",
  ],

  "plugins": [
    "stylelint-scss",
  ],

  "defaultSeverity": "warning",

  "rules": {
    "at-rule-empty-line-before": [ "always", {
      "except": [ "blockless-after-same-name-blockless", "first-nested" ],
      "ignoreAtRules": [ "else", "include" ]
    }],
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "indentation": 2,
    "rule-empty-line-before": ["always", {
      "except": ["after-single-line-comment", "first-nested"]
    }],
    "scss/dollar-variable-first-in-block": [true, {
      "ignore": ["comments", "imports"]
    }],
    "scss/selector-no-redundant-nesting-selector": true,
  }
}
