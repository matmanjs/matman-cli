const path = require('path');
const matman = require('matman');

const SRC_FILE = path.resolve('../test/data/fixtures/convert/convert-file/return-plain-object.js');
const SAVE_FILE = path.resolve('../test/data/fixtures/convert/convert-file/return-plain-object.json');

// function save(SRC_FILE, SAVE_FILE) {
//     matman.mocker.mockerModuleTool.save(SRC_FILE, SAVE_FILE)
//         .then((data) => {
//             console.log('成功！')
//         });
// }

/**
 * 转换 mock module
 * @param {Number} type 转换的类型，1=文件，2=文件夹
 * @param {String} target 目标
 * @param {String} output 输出
 */
function *convert(type, target, output) {
    console.log('convert', type, target, output);
    type = 1;

    return yield matman.mocker.mockerModuleTool.save(path.resolve(target), path.resolve(output));
}

module.exports = {
    convert: convert
};