import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    {
        extends: compat.extends(
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
        ),

        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },

                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir: '/home/drayx/zfort/boilerplate/reactjs-boilerplate',
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            '@typescript-eslint/no-empty-interface': ['off', {}],
            'react/prop-types': ['off'],
            'react/display-name': ['off'],
            'react/no-unknown-property': ['off'],
            'react/react-in-jsx-scope': ['off'],
            '@typescript-eslint/no-explicit-any': ['off', {}],
            '@typescript-eslint/no-non-null-assertion': ['off', {}],
            '@typescript-eslint/no-unnecessary-type-constraint': ['off', {}],
            '@typescript-eslint/explicit-module-boundary-types': ['off', {}],

            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: false,
                },
            ],
        },
    },
]);
