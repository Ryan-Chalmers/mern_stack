module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    "quotes": ["error", "double"],
    "require-jsdoc": 0,
    "import/no-unresolved": 0,
    "max-len": ["error", {"code": 300}],
  },
};
