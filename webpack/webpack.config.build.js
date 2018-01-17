const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {

	devtool: 'cheap-module-source-map',

	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].[chunkhash].js'
	},

	plugins: webpackConfig.plugins.concat([
		new CleanWebpackPlugin(['../dist/*.*']),

		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		})

		, new CopyWebpackPlugin([
			{ from: 'asset', to: 'asset' }
			//, { from: 'src/style', to: 'asset/css' }
		])
		
	])
});
