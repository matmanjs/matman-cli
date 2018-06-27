const run = require('./run');

/**
 * 启动服务
 *
 * @param {Boolean} isDev 是否为开发者模式
 * @param {String} configAbsolutePath matman.config.js 文件的绝对路径
 * @param {String} [cwd] 项目启动的目录，默认为 process.cwd()
 */
function startServer(isDev, configAbsolutePath, cwd) {
  let matmanConfig = require(configAbsolutePath);

  // 如果不定义 rootPath，则默认取 process.cwd()
  if (!matmanConfig.rootPath) {
    matmanConfig.rootPath = cwd || process.cwd();
  }

  run(matmanConfig);
}

module.exports = {
  startServer: startServer
};