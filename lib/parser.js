'use strict';

const version = '0.0.1';

const _ = require('lodash');
const co = require('co');
const shell = require('shelljs');
const argv = require('minimist')(process.argv.slice(2));
const Matman = require('./matman');

const matmanConvert = require('./convert');

const matman = new Matman(version);

const parseArgs = () => {
    co(function*() {
        const keys = Object.keys(argv);

        // logo
        if (keys.length === 1 && !argv['_'][0]) {
            return matman.printLogo();
        }

        // version
        if (argv['v'] || argv['V'] || argv['version']) {
            return matman.printVersion();
        }

        // help
        if (argv['h'] || argv['H'] || argv['help']) {
            return matman.printHelp();
        }

        // 转换 mock module 文件
        if (argv['_'][0] === 'convert') {
            /**
             * 帮助命令
             * --help 或 -h
             *
             * matman convert --help
             * matman convert -h
             */
            const help = argv['help'] || argv['h'];
            if (help) {
                return matman.printConvertHelp();
            }

            // 目标，必须为文件或者文件夹
            const target = argv['_'][1];

            // TODO 要验证下文件或文件夹的合法性
            if (!target) {
                shell.echo('convert 参数不合法，缺少 target');
                return;
            }

            // 如果目标是文件，则只能导出文件，如果是文件夹，则只能导出到某个指定的文件路径下

            /**
             * 将某个指定的文件转换并输出文件，参考了 babel 的命令
             * --out-file 或 -o 参数指定输出文件
             *
             * matman convert example.js --out-file compiled.json
             * matman convert example.js -o compiled.json
             */
            const outFile = argv['out-file'] || argv['o'];

            /**
             * 整个目录转换，参考了 babel 的命令
             * --out-dir 或 -d 参数指定输出目录
             *s
             * matman convert src --out-dir lib
             * matman convert src -d lib
             */
            const outDir = argv['out-dir'] || argv['d'];

            // console.log(target, outFile, outDir);
            //
            // shell.echo('convert 结束');

            try {
                yield matmanConvert.convert(target, outFile, outDir);
                shell.echo('convert success');
            } catch (e) {
                console.error(e);
                shell.echo('convert error');
            }
        }
    });
};

module.exports = parseArgs;