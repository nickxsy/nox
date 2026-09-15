import { defineConfig } from 'oxlint';

// oxlint-disable-next-line no-default-export
export default defineConfig({
  categories: {
    correctness: 'off',
    pedantic: 'off',
    perf: 'off',
    restriction: 'off',
    style: 'off',
    suspicious: 'off',
  },
  plugins: [
    'import',
    'node',
    'oxc',
    'promise',
    'typescript',
    // 'unicorn',
    // 'vitest',
  ],
  rules: {
    'eslint/no-unused-vars': 'warn',
  },
});