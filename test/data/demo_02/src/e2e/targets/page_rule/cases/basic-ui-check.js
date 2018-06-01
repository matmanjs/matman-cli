const env = require('./env/index');
const scanPage = require('../../../lib/handle-master/scan-page');

function getResult(opts, useRecorder) {
  // 如何校验，前端页面执行脚本
  let preloadClientScriptPath = getPreloadClientScriptPath('page_rule/crawlers/get-page-info');
  console.log('==preloadClientScriptPath==', preloadClientScriptPath);

  opts = Object.assign({
    proxyServer: env.OPTS.PROXY_SERVER_DEV,
    wait: env.OPTS.WAIT
  }, opts);

  return scanPage(env.getPageUrl(true), preloadClientScriptPath, opts, { useRecorder: useRecorder });
}

function getPreloadClientScriptPath(name) {
  const webpackConfig = require('../../../../../dist/webpack-config');
  const path = require('path');

  return path.join(webpackConfig.output.path, webpackConfig.output.filename.replace('[name]', name));
}

module.exports = getResult;

getResult({ show: true }, true)
  .then(function (result) {
    console.log(JSON.stringify(result));
  })
  .catch(function (error) {
    console.error('failed:', error);
  });


