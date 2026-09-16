import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    correctness: 'error',
    pedantic: 'error',
    perf: 'error',
    restriction: 'error',
    style: 'error',
    suspicious: 'error',
  },
  overrides: [
    {
      files: ['./examples/**'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['examples/**/*.ts'],
      rules: {
        'import/no-relative-parent-imports': 'off',
        'vitest/require-hook': 'off',
      },
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        'eslint/func-style': 'off',
        'eslint/init-declarations': 'off',
        'eslint/no-empty-function': 'off',
        'eslint/no-magic-numbers': 'off',
        'eslint/no-ternary': 'off',
        'eslint/prefer-destructuring': 'off',
        'eslint/sort-vars': 'off',
        'oxc/no-async-await': 'off',
        'promise/avoid-new': 'off',
        'typescript/explicit-function-return-type': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'vitest/expect-expect': 'off',
        'vitest/no-hooks': 'off',
        'vitest/no-importing-vitest-globals': 'off',
        'vitest/prefer-expect-assertions': 'off',
        'vitest/prefer-importing-vitest-globals': 'off',
        'vitest/require-test-timeout': 'off',
        'vitest/require-top-level-describe': 'off',
      },
    },
  ],
  plugins: [
    'import',
    'node',
    'oxc',
    'promise',
    'typescript',
    'unicorn',
    'vitest',
  ],
  rules: {
    'eslint/no-unused-vars': 'error',
    'eslint/one-var': 'off',
    'eslint/sort-imports': 'off',
    'import/consistent-type-specifier-style': 'off',
    'import/no-named-export': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'off',
    'oxc/no-async-await': 'off',
    'promise/avoid-new': 'off',
  },
});