const run = require('./run');

function startServer(configAbsolutePath, cwd) {
  let matmanConfig = require(configAbsolutePath);

  // 如果不定义 rootPath，则默认取 process.cwd()
  if (!matmanConfig.rootPath) {
    matmanConfig.rootPath = cwd;
  }

  run(matmanConfig);
}

module.exports = {
  startServer: startServer
};