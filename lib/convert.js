const path = require('path');
const osenv = require('osenv');
const matman = require('matman');
const babel = require("babel-core");
const fs = require('fs');
const Promise = require('bluebird');
const fse = Promise.promisifyAll(require('fs-extra'));

const util = require('./util');

const homeDir = osenv.home();

/**
 * 转换 mock module
 * @param {String} target 目标
 * @param {String} outFile 输出的文件
 * @param {String} outDir 输出的路径
 */
function convert(target, outFile, outDir) {
    console.log('convert target, outFile, outDir', target, outFile, outDir);

    const isDirectory = fs.lstatSync(target).isDirectory();
    const isFile = fs.lstatSync(target).isFile();

    if (isDirectory) {
        console.log('isDirectory');
        // 如果目标是目录，则需要获取该目录下所有的文件

        const allFiles = util.getAllFiles(target);
        // console.log(allFiles)

        const convertResultArr = [];

        allFiles.forEach((item) => {
            let curTarget = path.join(item.basePath, item.relativePath);
            let curOutFile = path.join(outDir, path.basename(item.relativePath, '.js') + '.json');

            convertResultArr.push(convertOneFile(curTarget, curOutFile));
        });

        return Promise.all(convertResultArr);
    } else if (isFile) {
        console.log('isFile');

        return convertOneFile(target, outFile);
    } else {
        return Promise.reject('unknown target');
    }
}

/**
 * 转换单个 mock module
 * @param {String} target 文件夹
 * @param {String} output 输出
 * @return {Promise}
 */
function convertOneFile(target, output) {
    // 获得要转换文件的绝对路径和保存后的绝对路径
    const TARGET_PATH = path.resolve(target);
    const OUTPUT_PATH = path.resolve(output);

    // 需要将目标文件babel一下，否则如果mock module是使用 es6 语法写的，则存在不兼容的问题，会报错
    const MATMAN_HOME_ROOT = path.join(homeDir, './.matman');
    const BABELED_FILE_PATH = path.join(MATMAN_HOME_ROOT, 'tmp', path.basename(TARGET_PATH));

    // babel 目标文件，并保存为临时文件
    const babelResult = babel.transformFileSync(TARGET_PATH);
    fse.outputFileSync(BABELED_FILE_PATH, babelResult.code);

    return matman.mocker.mockerModuleTool.save(BABELED_FILE_PATH, OUTPUT_PATH)
        .then((data) => {
            // 转换完成之后删除临时文件
            fse.removeSync(BABELED_FILE_PATH);

            return data;
        })
        .catch((err) => {
            // 转换完成之后删除临时文件
            fse.removeSync(BABELED_FILE_PATH);

            return Promise.reject(err);
        });
}

module.exports = {
    convert: convert
};