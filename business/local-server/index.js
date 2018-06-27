const path = require('path');
const fse = require('fs-extra');

const run = require('./run');
const runByPm2 = require('./run-by-pm2');

const matman = require('../matman');
const runConfig = require('./config');

/**
 * 启动服务
 *
 * @param {Boolean} isDev 是否为开发者模式
 * @param {String} configAbsolutePath matman.config.js 文件的绝对路径
 * @param {String} [cwd] 项目启动的目录，默认为 process.cwd()
 */
function startServer(isDev, configAbsolutePath, cwd) {
  // 开发模式下，直接调用执行
  let matmanConfig = require(configAbsolutePath);

  // 如果不定义 rootPath，则默认取 process.cwd()
  if (!matmanConfig.rootPath) {
    matmanConfig.rootPath = cwd || process.cwd();
  }

  // 获取一些默认值
  let configOpts = runConfig.getConfigOpts(matmanConfig);

  // 如果没法获取配置项，则将无法启动成功
  if (!configOpts) {
    throw new Error('Invalid param!');
  }

  if (isDev) {
    run(configOpts);
  } else {
    // pm2 的方式下，则需要先生成 pm2.json 文件，然后再使用 pm2 启动
    const buildPath = matman.mockerUtil.getMockServerBuildPath(configOpts.rootPath, configOpts.buildPath);
    const pm2ConfigFilePath = path.join(buildPath, 'pm2.json');

    // 获取配置信息
    let pm2Config = getPm2Config();

    // 本地构建一份配置到 buildPath 下
    fse.outputJson(pm2ConfigFilePath, pm2Config)
      .then(() => {
        console.log('Generate pm2.json success!', pm2ConfigFilePath);

        runByPm2(pm2ConfigFilePath, configAbsolutePath, cwd);
      })
      .catch((err) => {
        throw err;
      });
  }
}

function getPm2Config() {
  let result = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
      {
        name: 'matman_app',
        script: path.join(__dirname, './start-app.js'),
        watch: ['/Users/helinjiang/gitprojects/matman-cli/test/data/fixtures/mock_server'],
        ignore_watch: ['node_modules', 'build'],
        args: ['/Users/helinjiang/gitprojects/matman-cli/test/data/demo_04/matman.config.js', '/Users/helinjiang/gitprojects/matman-cli/test/data/demo_04'],
        env: {
          COMMON_VARIABLE: 'true'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };

  return result;
}

module.exports = {
  startServer: startServer
};