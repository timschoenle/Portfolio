export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '**/*.{ts,tsx}': () => 'pnpm type-check',
  '*.{json,css,md,yaml,yml}': 'prettier --write',
}
