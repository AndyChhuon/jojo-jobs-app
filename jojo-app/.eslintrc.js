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
  },
};
