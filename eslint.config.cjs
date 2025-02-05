const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const stylisticTs =  require("@stylistic/eslint-plugin-ts");
const jsdoc = require("eslint-plugin-jsdoc");
const noFloatingPromise = require("eslint-plugin-no-floating-promise");
const prettier = require("eslint-plugin-prettier");
const es = require("eslint-plugin-es");
const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
    {
        ignores: [
            "**/*.js",
            "**/*.cjs",
            "**/node_modules",
            "**/dist",
            "**/.nyc_output",
            "**/coverage",
            "**/coverageSummary",
            "**/webpack",
        ],
    },
    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ),
    {
        plugins: {
            '@stylistic-eslint-ts': stylisticTs,
            "@typescript-eslint": typescriptEslint,
            jsdoc,
            "no-floating-promise": noFloatingPromise,
            prettier,
            es,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                project: "./tsconfig.json",
            },
        },

        settings: {
            jsdoc: {
                allowOverrideWithoutParam: true,
            },
        },

        rules: {
            "no-tabs": ["error", {
                allowIndentationTabs: true,
            }],

            "@typescript-eslint/promise-function-async": "error",
            "no-floating-promise/no-floating-promise": "error",
            complexity: ["error", 30],
            semi: "off",
            "@stylistic-eslint-ts/semi": ["error"],
            "@stylistic-eslint-ts/member-delimiter-style": ["error", {
                multiline: {
                    delimiter: "semi",
                    requireLast: true,
                },

                singleline: {
                    delimiter: "semi",
                    requireLast: false,
                },

                multilineDetection: "brackets",
            }],

            "@typescript-eslint/naming-convention": ["error", {
                selector: ["interface"],
                modifiers: ["exported"],
                format: ["PascalCase"],

                custom: {
                    regex: "^I[A-Z]",
                    match: true,
                },
            }],

            "quote-props": ["error", "as-needed"],
            "no-multi-spaces": "error",
            "no-whitespace-before-property": "error",
            "no-console": "error",

            "comma-dangle": ["error", {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "never",
                functions: "always-multiline",
            }],

            "no-var": "error",

            "space-before-function-paren": ["error", {
                anonymous: "always",
                named: "never",
                asyncArrow: "always",
            }],

            "space-before-blocks": ["error", "always"],

            "comma-spacing": ["error", {
                before: false,
                after: true,
            }],

            "@stylistic-eslint-ts/type-annotation-spacing": ["error", {
                after: true,
            }],

            "new-cap": ["off"],
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-this-alias": "off",
            "no-async-promise-executor": "off",
            "no-unused-expressions": "error",
            "no-cond-assign": ["error", "always"],
            "@typescript-eslint/prefer-for-of": "error",
            "@typescript-eslint/no-floating-promises": "warn",

            "@typescript-eslint/member-ordering": ["error", {
                default: [
                    "signature",
                    "public-static-field",
                    "public-static-method",
                    "protected-static-field",
                    "protected-static-method",
                    "private-static-field",
                    "private-static-method",
                    "public-instance-field",
                    "public-abstract-field",
                    "public-field",
                    "protected-instance-field",
                    "protected-abstract-field",
                    "protected-field",
                    "private-instance-field",
                    "private-field",
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",
                    "constructor",
                    "public-instance-method",
                    "public-abstract-method",
                    "public-method",
                    "protected-instance-method",
                    "protected-abstract-method",
                    "protected-method",
                    "private-instance-method",
                    "private-method",
                    "method",
                ],
            }],

            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/require-await": "off",

            "prettier/prettier": ["error", {
                tabWidth: 4,
                useTabs: false,
                endOfLine: "auto",
                trailingComma: "all",
                bracketSpacing: false,
                parser: "typescript",
                printWidth: 120,
            }],

            "jsdoc/require-jsdoc": ["error", {
                contexts: [
                    "ExportNamedDeclaration TSInterfaceDeclaration",
                    "ExportNamedDeclaration TSTypeAliasDeclaration",
                    "ExportNamedDeclaration TSEnumDeclaration",
                    "ExportNamedDeclaration ClassDeclaration",
                    "MethodDefinition[accessibility=\"public\"]",
                    "TSAbstractMethodDefinition[accessibility=\"public\"]",
                    "ClassProperty[accessibility=\"public\"]",
                    "ExportNamedDeclaration TSInterfaceBody>TSPropertySignature",
                    "MethodDefinition[key.name=\"constructor\"][accessibility!=\"private\"][accessibility!=\"protected\"][value.params.length>0]",
                ],

                enableFixer: true,
                fixerMessage: " TODO: add comment.",
            }],

            "jsdoc/require-param": ["error", {
                contexts: [
                    "MethodDefinition[accessibility=\"public\"]",
                    "MethodDefinition[key.name=\"constructor\"]",
                ],
            }],

            "max-depth": ["error", 6],
            "max-nested-callbacks": ["error", 6],
            "max-lines-per-function": ["warn", 40],

            "jsdoc/match-description": ["warn", {
                mainDescription: "[A-Z].*\\.",

                tags: {
                    param: true,
                    returns: true,
                    docblock: true,
                },
            }],

            "@typescript-eslint/explicit-function-return-type": ["warn", {
                allowExpressions: true,
            }],

            "@typescript-eslint/explicit-module-boundary-types": "warn",
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/no-empty-object-type": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-require-imports": "warn",
            "@typescript-eslint/no-restricted-types": "warn",
            "@typescript-eslint/no-unsafe-function-type": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-wrapper-object-types": "warn",
            "max-params": ["warn", 6],
            "max-statements": ["warn", 40],
            "es/no-destructuring": "error",
        },
    },
    {
        files: ["test/**/*", "test-planner/**/*"],
        rules: {
            "jsdoc/require-jsdoc": "off",
            "max-lines-per-function": "off",
            "max-nested-callbacks": "off",
            "no-console": "off",
            "no-unused-expressions": "off",
            "@typescript-eslint/member-ordering": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",

        },
    }
];