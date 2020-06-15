module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jest: true,
    browser: true,
  },
  globals: {
    process: true,
  },
};
