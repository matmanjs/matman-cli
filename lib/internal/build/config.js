'use strict';

const fs = require('fs');
const path = require('path');

class Config {
    /**
     * @function getPath
     * @desc     Find matman.json file
     */
    static getPath() {
        let currDir = process.cwd();

        while (!fs.existsSync(path.join(currDir, 'matman.json'))) {
            currDir = path.join(currDir, '../');

            // unix跟目录为/， win32系统根目录为 C:\\格式的
            if (currDir === '/' || /^[a-zA-Z]:\\$/.test(currDir)) {
                console.error('未找到 matman.json');
                process.exit(1);
            }
        }

        return currDir;
    }

    /**
     * @function getBuilderType
     * @desc     Find builder type in matman.json
     */
    static getBuilderType() {
        let builderType;
        const configFile = path.join(Config.getPath(), './matman.json');

        if (!fs.existsSync(configFile)) {
            console.error('未找到 matman.json');
        } else {
            const fileContent = fs.readFileSync(configFile, 'utf-8');

            let matmanCfg;

            try {
                matmanCfg = JSON.parse(fileContent);
            } catch (ex) {
                console.error('请确保matman.json配置是一个Object类型，并且含有builderType字段');
            }

            builderType = matmanCfg.builderType;

            if (!builderType) {
              console.error('请确保matman.json配置是一个Object类型，并且含有builderType字段内容不为空')
            }
            return builderType;
        }
    }
}

module.exports = Config;
