const DISABLED = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    '@typescript-eslint/camelcase': DISABLED,
    '@typescript-eslint/ban-ts-comment': DISABLED,
    '@typescript-eslint/interface-name-prefix': DISABLED,
    '@typescript-eslint/no-empty-interface': DISABLED,
    '@typescript-eslint/no-var-requires': DISABLED,
    'react/prop-types': DISABLED,
    'react/prop': DISABLED,
    'no-unused-expressions': DISABLED
  }
};
