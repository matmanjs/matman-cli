'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const fse = require('fs-extra');

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

  return Promise.resolve();
};
