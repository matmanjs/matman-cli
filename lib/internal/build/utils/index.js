'use strict';

const fs = require('fs');
const path = require('path');
const fsHandler = require('fs-handler');

const configFileName = 'e2ex.config.js';

/**
 * 获得配置文件的路径
 *
 * @return {String}
 */
function getConfigPath(targetPath) {
    let currDir = targetPath || process.cwd();
    let isExist = true;

    while (!fs.existsSync(path.join(currDir, configFileName))) {
        currDir = path.join(currDir, '../');

        // unix跟目录为/， win32系统根目录为 C:\\格式的
        if (currDir === '/' || /^[a-zA-Z]:\\$/.test(currDir)) {
            isExist = false;
            console.log('未找到 ' + configFileName);
            break;
        }
    }

    return isExist ? currDir : '';
}

function getConfig(targetPath) {
    let configPath = getConfigPath(targetPath);

    // 如果没有存在配置文件，则返回空对象
    if (!configPath) {
        return {};
    }

    const configFile = path.join(configPath, configFileName);

    // 如果没有存在配置文件，则返回空对象
    if (!fs.existsSync(configFile)) {
        return {};
    }

    return fsHandler.handle.getModuleResult(configFile);
}

module.exports = {
    getConfigPath: getConfigPath,
    getConfig: getConfig
};
