const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const node = 'node_modules';
const scripts = path.join(__dirname, '../src/script');
const assets = path.join(__dirname, '../asset');

const title = 'ECS PIXI BABEL WEBPACK';


const createLintingRule = () => ({
	test: /\.(js|vue)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [scripts],
	exclude: [scripts + '/core/tinyecs'],
	options: {
		formatter: require('eslint-friendly-formatter'),
		emitWarning: true
	}
})

/**
 * Webpack Configuration
 */
module.exports = {
	entry: {
		vendor: [
			'lodash',
			// path.join(__dirname, '../src/lib/ash.min.js')
		],
		bundle: path.join(scripts, 'index')
	},
	resolve: {
		modules: [
			node,
			scripts,
			assets
		],
		alias: {
			styl: path.resolve(__dirname, '../src/style/')
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			IS_DEV: IS_DEV
		}),

		new webpack.ProvidePlugin({
			// lodash
			'_': 'lodash'
		}),

		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../src/template/index.ejs'),
			title: title
		}),

		new webpack.LoaderOptionsPlugin({
			options: {
				stylus: {
					import: [
						path.resolve(__dirname, '../src/style/reset.styl'), 
						path.resolve(__dirname, '../src/style/global.styl')
					]
				}
			}
		})
	],
	module: {
		rules: [
			{
			  test: /\.exec\.js$/,
			  use: [ 'script-loader' ]
			},
			// createLintingRule(),
			// BABEL
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				options: {
					compact: true
				}
			},

			// STYLES
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV
						}
					},
				]
			},

			{
				
				test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'
				
			},

			// EJS
			{
				test: /\.ejs$/,
				loader: 'ejs-loader'
			},

			// IMAGES
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		]
	}
};
