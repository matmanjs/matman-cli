'use strict';

/**
 * Copyright (c) 2018 Tencent Inc.
 *
 * Webpack构建器，适用于NOW直播IVWEB团队工程项目.
 *
 * cpselvis <cpselvis@gmal.com>
 */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// const HappyPack = require('happypack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StringReplaceWebpackPlugin = require('string-replace-webpack-plugin');
const utils = require('../utils');
const projectRoot = utils.getConfigPath();

// const WebpackLoaderInsertJS = require('./webpack-loader-insert-js');

class Builder {

    /**
     * @function createProdConfig
     * @desc     创建用于生产环境中的webpack打包配置
     *
     * @param {Object}  params
     * @param {String} params.distClientPath
     * @param {String} params.srcClientPath
     * @param {String} params.entryRelativePath
     * @param {Object} params.jsLoader
     * @param {String}  params.minifyJS
     * @param {Object}  opts
     * @example
     */
    static createProdConfig(params = {}, opts = {}) {
        const prodConfig = {};

        // 设置打包规则
        const prodRules = [];

        // 设置一些entry文件的代码，比如自动打包 jQuery 库进去
        prodRules.push(Builder._getAppendBeforeRule(params.entryRelativePath));

        // 设置打包插件
        let prodPlugins = [];

        // 清空, https://github.com/johnagan/clean-webpack-plugin/issues/17
        prodPlugins.push(new CleanWebpackPlugin([params.distClientPath], {
            root: projectRoot,
            verbose: true,
            dry: false
        }));

        prodPlugins.push(new StringReplaceWebpackPlugin());

        // TODO 这里会报错
        // if (params.minifyJS) {
        //     // 压缩JS
        //     prodPlugins.push(new webpack.optimize.UglifyJsPlugin());
        // }

        // 设置NODE_ENV 为 production
        prodPlugins.push(Builder._setDefinePlugin('production'));

        // 多实例构建
        // prodPlugins.push(Builder._setHappyPack(params.jsLoader));

        prodConfig.entry = Builder._getEntry(path.join(params.srcClientPath, params.entryRelativePath));
        prodConfig.output = {
            filename: '[name].js',
            path: params.distClientPath
        };
        prodConfig.module = {
            rules: prodRules
        };
        prodConfig.plugins = prodPlugins;

        // config 文件配置项
        prodConfig._configParams = params;

        return prodConfig;
    }

    static _getEntry(entryPath) {
        let entry = {};
        // let dist = {};

        entryPath = entryPath.replace(/\\/gi, '/');
        // let distClientPath = this.distClientPath.replace(/\\/gi, '/');

        let globResult = glob.sync(path.resolve(entryPath, './**/**.js'));

        globResult.forEach((item) => {
            item = item.replace(/\\/gi, '/');

            const matchResult = item.match(new RegExp(entryPath + '/(.*)\\.js'), 'gi');

            const entryName = matchResult && matchResult[1];
            if (entryName) {
                entry[entryName] = item;
                // dist[entryName] = item.replace(new RegExp(entryPath, 'gi'), distClientPath);
            }
        });

        return entry;
    }

    static _setHappyPack(jsLoader) {
        let options = Object.assign({
            cacheDirectory: true,
            plugins: [
                'transform-decorators-legacy',
                [
                    'import', {
                    'libraryName': 'antd',
                    'libraryDirectory': 'es',
                    'style': 'css'
                }
                ]
            ],
            presets: ['es2015', 'stage-0']
        }, jsLoader);

        return new HappyPack({
            loaders: [
                {
                    loader: 'babel-loader',
                    options
                }
            ]
        });
    }

    /**
     * 设置Js文件解析规则, 此处使用happypack,多实例构建
     *
     * @returns {{test: RegExp, loader: string}}
     * @private
     */
    static _setJsRule() {
        // TODO 下面这一个配置会报错
        return { test: /\.js$/, loader: 'happypack/loader' };
    }

    /**
     * 获得插入部分前置代码的配置，只限定在打包文件中才使用，而不是所有js文件
     *
     * @param {String} entryRelativePath
     * @returns {{test: RegExp, loader: string}}
     * @private
     */
    static _getAppendBeforeRule(entryRelativePath) {
        return {
            test: new RegExp(path.basename(entryRelativePath) + '.*\.js$'),
            loader: path.join(__dirname, './webpack-loader-insert-js')
        };
    }

    /**
     * 设置NODE_ENV，否则 线上会报 warning.
     * https://stackoverflow.com/questions/30030031
     */
    static _setDefinePlugin(env) {
        return new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        });
    }
}

module.exports = Builder;