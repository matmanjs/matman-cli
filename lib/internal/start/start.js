'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const fse = require('fs-extra');

const localServer = require('../../../business/local-server');

module.exports = function (args) {
  // console.log(args);
  // console.log(process.cwd());
  const cwd = process.cwd();

  // 传递进来的文件，或者默认的 matman.config.js 文件
  let config = args.config || 'matman.config.js';

  // 绝对路径
  let configAbsolutePath = path.resolve(cwd, config);

  // 一定要检查是否存在
  if (fs.existsSync(configAbsolutePath)) {
    console.log('Load config file:', configAbsolutePath);
  } else {
    console.error('Unkown config file: ', configAbsolutePath);
    return Promise.reject();
  }

  let matmanConfig = require(configAbsolutePath);

  // 如果不定义 rootPath，则默认取 process.cwd()
  if (!matmanConfig.rootPath) {
    matmanConfig.rootPath = cwd;
  }

  // 启动本地服务
  localServer.startServer(matmanConfig);

  return Promise.resolve();
};
