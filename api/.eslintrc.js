module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', '@typescript-eslint/eslint-plugin', 'prettier'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'error',
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 0,
				ignoredNodes: ['PropertyDefinition']
			}
		],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				disallowTypeAnnotations: true,
				fixStyle: 'separate-type-imports'
			}
		],
		'no-console': 'error',
		'padding-line-between-statements': [
			'warn',
			{
				blankLine: 'always',
				prev: '*',
				next: 'block'
			},
			{
				blankLine: 'always',
				prev: 'block',
				next: '*'
			},
			{
				blankLine: 'always',
				prev: '*',
				next: 'block-like'
			},
			{
				blankLine: 'always',
				prev: 'block-like',
				next: '*'
			}
		],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'no-empty': 'off',
		'prettier/prettier': [
			'error',
			{},
			{
				usePrettierrc: true
			}
		]
	}
}
