// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
                project: './tsconfig.json'
            },
        },
    }
);