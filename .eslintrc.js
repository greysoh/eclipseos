module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",

    ecmaFeatures: {
      globalReturn: true
    },
  },

  globals: {
    Kernel: true,
    argv: true,
  },

  extends: "eslint:recommended",

  overrides: [],
  rules: {},
};
