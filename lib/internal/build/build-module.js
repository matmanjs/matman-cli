'use strict';

const path = require('path');
const Promise = require('bluebird');
const matmanCore = require('matman-core');

module.exports = function (args) {
  // node ./bin/matman build-module --a=11 --b=3a
  // { _: [], a: 11, b: '3a' }
  // console.log(args);

  // 必须要传入 srcPath 和 disPath，且顺序不能交换
  let pArr = args._;
  if (!pArr || pArr.length < 2) {
    console.error('Please check the cmd: build-module <srcPath> <distPath>');
    process.exit(1);
  }

  // TODO 如果 srcPath 不存在，则进行提示

  // TODO 如果 distPath 路径存在，则需要二次确认，避免被覆盖

  let srcPath = path.resolve(pArr[0]);
  let distPath = path.resolve(pArr[1]);

  // 直接构建
  matmanCore.serialize(srcPath, distPath, args);

  return Promise.resolve();
};
