/**
 * Created by evio on 16/7/20.
 */
'use strict';

const path = require('path');
const AutoPrefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const result = {};
result.plugins = [];

result.plugins.push(new ExtractTextPlugin('build.css'));
/**
 * 配置启动文件地址
 * @type {*|Promise.<*>}
 */
result.entry = path.resolve(__dirname, './index.js');

/**
 * 配置输出文件地址和输出文件模式
 * @type {{path: (*|Promise.<*>), filename: string, libraryTarget: string}}
 */
result.output = {
    path: __dirname,
    filename: 'build.js',
    library: 'MioxVueRouter',
    libraryTarget: 'umd'
};

result.module = {};

/**
 * 配置loaders
 * @type {*[]}
 */
result.module.loaders = [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel" },
    { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss") },
    { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")  }
];

/**
 * autoprefix
 * @returns {*[]}
 */
result.postcss = () => {
    return [ AutoPrefixer({browsers: ['last 20 versions']}) ];
};

module.exports = result;