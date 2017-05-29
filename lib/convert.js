const path = require('path');
const osenv = require('osenv');
const matman = require('matman');
const babel = require("babel-core");
const fse = require('fs-extra');

const homeDir = osenv.home();

/**
 * 转换 mock module
 * @param {Number} type 转换的类型，1=文件，2=文件夹
 * @param {String} target 目标
 * @param {String} output 输出
 */
function *convert(type, target, output) {
    console.log('convert', type, target, output);
    type = 1;

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
        fse.removeSync(BABELED_FILE_PATH);
    } catch (e) {
        yield Promise.reject(e);
    }
}

module.exports = {
    convert: convert
};