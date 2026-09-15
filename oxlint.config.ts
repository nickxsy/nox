import { defineConfig } from 'oxlint';

// oxlint-disable-next-line no-default-export
export default defineConfig({
  categories: {
    correctness: 'error',
    pedantic: 'warn',
    perf: 'warn',
    restriction: 'error',
    style: 'warn',
    suspicious: 'warn',
  },
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
    'eslint/no-unused-vars': 'warn',
  },
});