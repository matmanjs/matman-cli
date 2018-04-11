'use strict';

const path = require('path');
const Promise = require('bluebird');
const matmanCore = require('matman-core');
const fse = require('fs-extra');

module.exports = function (args) {
  // node ./bin/matman build-module xx/yy zz/ww --a=11 --b=3a
  // { _: [ 'xx/yy', 'zz/ww' ], a: 11, b: '3a' }
  console.log(args);

  // 必须要传入 srcPath 和 disPath，且顺序不能交换
  let pArr = args._;
  if (!pArr || pArr.length < 2) {
    console.error('Please check the cmd: build-module <srcPath> <distPath>');
    process.exit(1);
  }

  let srcPath = path.resolve(pArr[0]);
  let distPath = path.resolve(pArr[1]);

  // 如果 srcPath 不存在，则进行提示
  if (!fse.pathExistsSync(srcPath)) {
    console.error('The path is not exist: ' + srcPath);
    process.exit(1);
  }

  // 如果 distPath 路径存在，则需要二次确认，避免被覆盖

  // 直接构建
  matmanCore.serialize(srcPath, distPath, args);

  return Promise.resolve();
};
