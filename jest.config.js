module.exports = {
  setupFiles: [require.resolve("whatwg-fetch")],
  setupFilesAfterEnv: ["./setup-tests.js"],
  moduleDirectories: ["node_modules", "<rootDir>"],
};
