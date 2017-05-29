'use strict';

const _ = require('lodash');
const osenv = require('osenv');
const path = require('path');
const fs = require('fs');
const co = require('co');
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');
const meow = require('meow');
const figlet = require('figlet');
const rp = require('request-promise');

const homeDir = osenv.home();

class Matman {

    constructor(version) {
        this.version = version;
    }

    /**
     * 打印版本号
     * @private
     */
    printVersion() {
        shell.echo(`v${this.version}`);
    }

    /**
     * 打印帮助信息
     * @private
     */
    printHelp() {
        const cli = meow(`
            Usage: matman [options] [command]
            
            Commands:
                convert               Convert mock modules.
                
            Options:
                -v, --version         Print version and exit successfully.
                -h, --help            Print this help and exit successfully.
                
            Report bugs to https://github.com/helinjiang/matman-cli/issues.    
        `);

        return cli.showHelp(1);
    }

    /**
     * 打印banner
     * 字体预览地址：http://patorjk.com/software/taag/#p=display&f=Star%20Wars&t=matman
     * @private
     */
    printLogo() {
        figlet.text('matman', {
            font: 'Star Wars',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }

            console.log(chalk.cyan(data));
            console.log(chalk.cyan(''));
            console.log(chalk.cyan(` MatMan, make mocking and testing easy！`));
            console.log(chalk.cyan(''));
            console.log(chalk.cyan(' Run matman --help to see help.'));
        });
    }

    /**
     * 打印convert命令的帮助信息
     * @private
     */
    printConvertHelp() {
        const cli = meow(`
            Usage: matman convert [options] <files ...>   
                
            Options:
                -h, --help              Print this help and exit successfully.
                -o, --out-file [out]    Convert an mock module into a single file.
                -d, --out-dir [out]     Convert an input directory of modules into an output directory.
                 
        `);

        return cli.showHelp(1);
    }
}

module.exports = Matman;