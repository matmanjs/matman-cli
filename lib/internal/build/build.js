'use strict';

const osenv = require('osenv');
const path = require('path');
const fs = require('hexo-fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const yeoman = require('yeoman-environment');
const yeomanEnv = yeoman.createEnv();

const os = require('os');
const Promise = require('bluebird');
const matmanCore = require('matman-core');

module.exports = function (args) {

  console.log(args);

  // 必须要传入 srcPath 和 disPath，且顺序不能交换
  let pArr = args._;
  if (!pArr || pArr.length < 2) {
    console.error('Please check the cmd: build <srcPath> <distPath> [--simple]');
    process.exit(1);
  }

  // TODO 如果 srcPath 不存在，则进行提示

  // TODO 如果 distPath 路径存在，则需要二次确认，避免被覆盖

  // 是否为简单模式，该模式下只是单纯便宜
  let isSimple = args.simple;

  if (isSimple) {
    console.log('简单转换');
    matmanCore.serialize(pArr[0], pArr[1]);
  } else {
    console.log('转换为 npm 包');

    let generatorPath = path.resolve(__dirname, '../../generators/npm-package');

    let name = 'npm-package';

    yeomanEnv.register(require.resolve(generatorPath), name);

    yeomanEnv.run(name, { 'skip-install': true }, err => {
    });
  }

  return Promise.resolve();
};