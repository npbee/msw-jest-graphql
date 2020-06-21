module.exports = {
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  env: {
    jest: true,
    browser: true,
    es6: true,
  },
  globals: {
    process: true,
  },
};
