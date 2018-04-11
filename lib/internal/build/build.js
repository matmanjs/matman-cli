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
  let srcPath = path.resolve(pArr[0]);
  let distPath = path.resolve(pArr[1]);

  if (isSimple) {
    console.log('简单转换');
    matmanCore.serialize(srcPath, distPath);
  } else {
    console.log('转换为 npm 包');

    let generatorPath = path.resolve(__dirname, '../../generators/npm-package');

    let name = 'npm-package';

    yeomanEnv.register(require.resolve(generatorPath), name);

    let yeoResult = yeomanEnv.run(name, { 'skip-install': true, 'srcPath': srcPath }, err => {
      console.log('=====end===', err);
      // console.log('==result2==', result.answers);
      // console.log('==result3==', result.templatePath('_package.json'));
      // console.log('==result3==', result.templatePath());
      // console.log('==result3==', result.destinationPath('package.json'));
      // console.log('==result3==', result.destinationPath());
      // console.log('==result3==', result.destinationPath('src'));
      // console.log('==result3==', result.destinationPath('lib'));
      // result.fs.copy(
      //   this.templatePath('gitignore'),
      //   this.destinationPath('.gitignore')
      // );

      // result.fs.copy srcPath => src
      // matmanCore.serialize(srcPath, lib)

      // const sourceDir = path.join(yeoResult.templatePath(), './src/');
      // const sourceDir = srcPath;
      // const filePaths = getFiles(srcPath);
      //
      // filePaths.map((filePath) => {
      //   console.log('-----', filePath);
      //   yeoResult.fs.copy(
      //     // this.templatePath('./src/' + filePath),
      //     path.join(srcPath, filePath),
      //     yeoResult.destinationPath('./src/' + filePath)
      //   );
      // });
      //
      // console.log('==', srcPath, path.resolve(srcPath), yeoResult.destinationPath('lib'));

      // matmanCore.serialize(srcPath, yeoResult.destinationPath('lib'));
    });

  }

  return Promise.resolve();
};

// function getFiles(root, filter, files, prefix) {
//   prefix = prefix || '';
//   files = files || [];
//   filter = filter || function (x) {
//     return x[0] !== '.';
//   };
//
//   const dir = path.join(root, prefix);
//
//   if (!fs.existsSync(dir)) {
//     return files;
//   }
//
//   if (fs.statSync(dir).isDirectory()) {
//     fs.readdirSync(dir)
//       .filter(filter)
//       .forEach(function (name) {
//         getFiles(root, filter, files, path.join(prefix, name));
//       });
//   } else {
//     files.push(prefix);
//   }
//
//   return files;
// }