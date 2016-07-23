/**
 * Created by evio on 16/7/20.
 */
'use strict';

const path = require('path');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const result = {};

/**
 * 配置启动文件地址
 * @type {*|Promise.<*>}
 */
result.entry = path.resolve(__dirname, '../src/development');

/**
 * 配置输出文件地址和输出文件模式
 * @type {{path: (*|Promise.<*>), filename: string, libraryTarget: string}}
 */
result.output = {
    path: path.resolve(__dirname, '../release'),
    filename: 'miox.js',
    libraryTarget: 'var'
};

result.module = {};

/**
 * 配置loaders
 * @type {*[]}
 */
result.module.loaders = [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel" },
    { test: /\.scss$/, loader: "style!css!postcss!sass" }
];

/**
 * autoprefix
 * @returns {*[]}
 */
result.postcss = () => {
    return [ AutoPrefixer({browsers: ['last 20 versions']}) ];
};

/**
 * 配置插件
 * @type {*[]}
 */
result.plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        filename: './index.html'
    })
];

module.exports = result;