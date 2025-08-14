import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ...fixupConfigRules(pluginReactConfig),
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
        "react/react-in-jsx-scope": "off", // Not needed with React 17+
        "react/jsx-uses-react": "off",    // Not needed with React 17+
        "react/prop-types": "off"         // Optional: disable prop-types rule if not using them
    }
  },
];