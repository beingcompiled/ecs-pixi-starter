// https://eslint.org/docs/user-guide/configuring
// https://eslint.org/docs/rules/

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	// https://github.com/standard/standard/blob/master/docs/RULES-en.md
	extends: 'standard',
	// required to lint *.vue files
	// plugins: [
	// 	'html'
	// ],
	// add your custom rules here
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'indent': [0, 'tab'],
		'no-tabs': 0,
		'no-new': 0,
		'no-unused-vars': 0,
		'no-trailing-spaces': 0,
		'no-extra-semi': 0,
		'semi': 0,
		'padded-blocks': 0,
		'brace-style': 0,
		'space-before-function-paren': 0,
		'no-multiple-empty-lines': 0,
		'space-infix-ops': 0,
		'eol-last': 0,
		'curly': 0,
		'no-multi-spaces': 0
	}
}
