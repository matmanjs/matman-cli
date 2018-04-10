'use strict';

const os = require('os');
const Promise = require('bluebird');

module.exports = function (args) {
  // 必须要传入 srcPath 和 disPath，且顺序不能交换
  let pArr = args._;
  if (!pArr || pArr.length < 2) {
    console.error('Please check the cmd: build <srcPath> <distPath> [--simple]');
    process.exit(1);
  }

  // 是否为简单模式，该模式下只是单纯便宜
  let isSimple = args.simple;


  return Promise.resolve();
};