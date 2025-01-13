import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { customMemberAccessibility } from './Eslint/CustomMemberAccessibility.js'

const config = [
    {
        ignores: ['node_modules/**'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            ...customMemberAccessibility
        },
        rules: {
            'custom-member-accessibility/add-public-modifier': 'error',
            '@typescript-eslint/explicit-member-accessibility': [
                'error', { accessibility: 'explicit', overrides: { constructors: 'no-public' } }
            ],
            '@typescript-eslint/prefer-readonly': 'error',
            "@typescript-eslint/explicit-function-return-type": "error",
            quotes: ['error', 'double'],
            'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
            semi: ['error', 'never'],
            'comma-dangle': ['error', 'never']
        },
    },
];

export default config;
