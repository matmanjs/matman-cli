'use strict';

const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StringReplaceWebpackPlugin = require('string-replace-webpack-plugin');

const utils = require('../utils');
const projectRoot = utils.getConfigPath();

class Builder {

  /**
   * @function createProdConfig
   * @desc     创建用于生产环境中的webpack打包配置
   *
   * @param {Object} params
   * @param {RegExp} params.clientScriptMatch 正则表达式，用于匹配路径中那些文件是 client script
   * @param {Object} params.entry 传递给webpack 的 entry属性属性
   * @param {String} params.distClientPath 输出打包后的 client script 的路径
   * @param {String} params.minifyJS
   * @param {Object} opts
   * @example
   */
  static createProdConfig(params = {}, opts = {}) {
    // 设置打包规则
    const prodRules = [];

    // 设置一些entry文件的代码，比如自动打包 jQuery 库进去
    prodRules.push(Builder._getAppendBeforeRule(params.clientScriptMatch));

    // 设置打包插件
    let prodPlugins = [];

    // 清空, https://github.com/johnagan/clean-webpack-plugin/issues/17
    prodPlugins.push(new CleanWebpackPlugin([params.distClientPath], {
      root: projectRoot,
      verbose: true,
      dry: false
    }));

    // 替换
    prodPlugins.push(new StringReplaceWebpackPlugin());

    // 设置NODE_ENV 为 production
    prodPlugins.push(Builder._setDefinePlugin('production'));

    // 设置 webpack 配置
    const prodConfig = {};
    prodConfig.entry = params.entry;
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

  /**
   * 获得插入部分前置代码的配置，只限定在 client script 打包文件中才使用，而不是所有js文件
   *
   * @param {RegExp} clientScriptMatch
   * @returns {{test: RegExp, loader: string}}
   * @private
   */
  static _getAppendBeforeRule(clientScriptMatch) {
    return {
      test: clientScriptMatch,
      loader: path.join(__dirname, './webpack/webpack-loader-insert-js')
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