// eslint.config.mjs
import { configs } from "@nullvoxpopuli/eslint-configs";

const config = configs.ember(import.meta.dirname);

export default [
  ...config,
  {
    files: ["**/*.{js,cjs,mjs}"],
    rules: {
      "n/no-unsupported-features/node-builtins": "off",
      "n/no-unsupported-features/es-syntax": "off",
    },
  },
];
