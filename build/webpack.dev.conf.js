var utils = require('./utils')
var multiPage = require('./multi-page')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackIconfontPluginNodejs = require('./svg2font.js')

process.title = 'ePortal-dev-server';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: false})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        ...multiPage.htmlPlugins(baseWebpackConfig),
        new FriendlyErrorsPlugin(),
        webpackIconfontPluginNodejs
    ],
    optimization: {
        runtimeChunk: false,
        minimize: false,
        noEmitOnErrors: true,
        splitChunks: false
    },
})
