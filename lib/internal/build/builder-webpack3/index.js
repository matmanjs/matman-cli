'use strict';

const webpack = require('webpack');
const Builder = require('./builder');
const utils = require('../utils');

function getWebpackConfig(opts) {
    return utils.getConfig()
        .then((data) => {
            // console.log('config.getConfig then', data);

            return Builder.createProdConfig(data, opts);
        });
}

function runBuild(webpackConfig, callback) {
    // 这个参数是临时值，传递给 webpack 时移除之
    delete webpackConfig._configParams;

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            throw err;
        }

        console.log(stats.toString({
            chunks: false,
            colors: true,
            children: false
        }));

        callback();
    });
}

module.exports = {
    getWebpackConfig: getWebpackConfig,
    runBuild: runBuild
};
