'use strict';

const fs = require('fs');
const path = require('path');
const osenv = require('osenv');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const shell = require('shelljs');
const Validate = require('./validate');
const Utils = require('./utils');
const logger = require('./logger');

const log = logger({});

module.exports = class extends Generator {

  constructor(...args) {
    super(...args);

    this.answers = {};
  }

  /**
   * Show template basic message.
   */
  initializing() {
    this.log(yosay('NOW直播工程脚手架'));
    this.log(
      chalk.magenta(
        `欢迎您！` +
        '\n' +
        '这是一款基于Webpack打包的模板, Powered by http://www.feflowjs.org/.' +
        '\n'
      )
    );
  }

  /**
   * Interact with developer.
   */
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      default: 'matman-mocker-xxx'
    }, {
      type: 'input',
      name: 'description',
      message: '请输入项目描述信息(至少5个汉字)'
    }, {
      type: 'input',
      name: 'version',
      message: '请输入版本 (1.0.0):',
      default: '1.0.0'
    }]).then((answers) => {
      this.answers = answers;
    });
  }

  /**
   * Validate developer input message.
   */
  validate() {
    const { description } = this.answers;

    log.info('即将开始校验输入的项目基本信息');

    if (!Validate.validateStrLength(description, 10)) {
      log.info('项目描述信息至少需要5个汉字，请重新输入!');
      return this.prompting();
    }

    log.info('校验通过，即将在本地生成代码');
  }

  /**
   * Generator project files.
   */
  writing() {
    const { name, description, version } = this.answers;

    const _copyTemplates = () => {
      // If current folder doesn't exist project folder
      if (path.basename(this.destinationPath()) !== name) {
        mkdirp(name);
      }

      shell.cd(name);

      this.destinationRoot(this.destinationPath(name));

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          name: name,
          description: description,
          version: version
        }
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );

      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        {
          name: name,
          description: description
        }
      );

      this.fs.copy(
        this.templatePath('build.js'),
        this.destinationPath('build.js')
      );

    };

    _copyTemplates();
  }

  install() {
    log.info('安装完成');
  }

  end() {
    log.info('本次初始化过程结束');
  }
};
