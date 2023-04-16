module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["react"],
  ignorePatterns: ["*.test.js"],

  rules: {
    "linebreak-style": 0,
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "react/jsx-one-expression-per-line": 0,
    "comma-dangle": 0,
    "no-plusplus": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    radix: 0,
    "operator-linebreak": 0,
    "object-curly-newline": 0,
    "brace-style": 0,
    "no-nested-ternary": 0,
    "react/jsx-no-bind": 0,
    "implicit-arrow-linebreak": 0,
    "react/jsx-curly-newline": 0,
    "max-len": 0,
    "function-paren-newline": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-unknown-property": 0,
    "spaced-comment": 0,
    "react/jsx-indent" : 0,
    "indent" : 0,
    "no-multiple-empty-lines" : 0,
    "react/jsx-closing-tag-location" : 0,
    "no-trailing-spaces" : 0,
    "no-unused-vars" : 0,
    "no-multi-spaces" : 0,
    "react/jsx-props-no-multi-spaces" : 0,
    "react/jsx-equals-spacing" : 0,
    "react/jsx-curly-spacing" : 0,
    "no-undef" : 0,
    "space-infix-ops" : 0,
    "react/jsx-tag-spacing " : 0,
    "object-curly-spacing" : 0,
    "react/jsx-tag-spacing" : 0,
    "react/self-closing-comp" : 0,
    "react/button-has-type" : 0,

  },
};
