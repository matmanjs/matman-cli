const path = require('path');
const osenv = require('osenv');
const matman = require('matman');
const babel = require("babel-core");
const fs = require('fs');
const Promise = require('bluebird');
const fse = Promise.promisifyAll(require('fs-extra'));
const walkSync = require('walk-sync');

const homeDir = osenv.home();

/**
 * 转换 mock module
 * @param {String} target 目标
 * @param {String} outFile 输出的文件
 * @param {String} outDir 输出的路径
 */
function *convert(target, outFile, outDir) {
    console.log('convert target, outFile, outDir', target, outFile, outDir);

    const isDirectory = fs.lstatSync(target).isDirectory();
    const isFile = fs.lstatSync(target).isFile();

    if (isDirectory) {
        console.log('isDirectory');
        // 如果目标是目录，则需要获取该目录下所有的文件

        const allFiles = getAllFiles(target);
        // console.log(allFiles)

        const convertResultArr = [];

        allFiles.forEach((item) => {
            let curTarget = path.join(item.basePath, item.relativePath);
            let curOutFile = path.join(outDir, path.basename(item.relativePath, '.js') + '.json');

            convertResultArr.push(convertOneFile(curTarget, curOutFile));
        });

        yield convertResultArr;
    } else if (isFile) {
        console.log('isFile');

        return yield convertOneFile(target, outFile);
    } else {
        return Promise.reject('unknown target');
    }
}

/**
 * 转换 mock module
 * @param {String} target 文件夹
 * @param {String} output 输出
 */
function *convertOneFile(target, output) {
    // 获得要转换文件的绝对路径和保存后的绝对路径
    const TARGET_PATH = path.resolve(target);
    const OUTPUT_PATH = path.resolve(output);

    // 需要将目标文件babel一下，否则如果mock module是使用 es6 语法写的，则存在不兼容的问题，会报错
    const MATMAN_HOME_ROOT = path.join(homeDir, './.matman');
    const BABELED_FILE_PATH = path.join(MATMAN_HOME_ROOT, 'tmp', path.basename(TARGET_PATH));

    // babel 目标文件，并保存为临时文件
    const babelResult = babel.transformFileSync(TARGET_PATH);
    fse.outputFileSync(BABELED_FILE_PATH, babelResult.code);

    try {
        // 处理转化
        yield matman.mocker.mockerModuleTool.save(BABELED_FILE_PATH, OUTPUT_PATH);

        // 转换完成之后删除临时文件
        // fse.removeSync(BABELED_FILE_PATH);
    } catch (e) {
        yield Promise.reject(e);
    }
}

/**
 * 获得某路径下所有的文件和文件夹。
 *
 * https://www.npmjs.com/package/walk-sync
 *
 * @param {String} paths 路径
 * @param {Object} [options] 额外选项
 * @param {Array} [options.globs] An array of globs. Only files and directories that match at least one of the provided globs will be returned.
 * @param {Boolean} [options.directories ]  (default: true): Pass false to only return files, not directories
 * @param {Array} [options.ignore] An array of globs. Files and directories that match at least one of the provided globs will be pruned while searching.
 *
 * @return {Array} 结果，每个数组的元素为FileItem。
 */
function getAllFiles(paths) {
    var result = [];

    var entry = walkSync.entries(paths, { directories: false });

    entry.forEach(function (item) {
        // result.push(new FileItem(item.basePath, item.relativePath, item.mode, item.size, item.mtime, item.isDirectory()));
        result.push(item);
    });

    return result;
}

module.exports = {
    convert: convert
};