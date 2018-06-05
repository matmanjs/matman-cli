const fs = require('fs');
const path = require('path');

/**
 * 获取最终的配置数据
 * @param {Object | String} opts 用户传递过来的参数
 * @returns {Object}
 */
function getConfigOpts(opts) {
  let configOpts;

  try {
    // opts 如果是字符串则认为是文件路径，可将配置项放在独立的配置文件中
    if (typeof opts === 'string' && fs.existsSync(opts)) {
      configOpts = require(opts);
    } else if (opts && (typeof opts === 'object')) {
      configOpts = opts;
    } else {
      configOpts = null;
    }
  } catch (e) {
    console.error('getConfigOpts catch e:', e);
  }

  // 必须要存在配置
  if (!configOpts) {
    console.error('Could not get configOpts!', opts);
    return null;
  }

  // 如果没有 basePath，则将无法启动成功
  if (!configOpts.basePath) {
    console.error('Should define basePath!', opts, configOpts);
    return null;
  }

  // mocker 的配置项，设置一些默认值
  if (configOpts.mocker) {
    configOpts.mocker = Object.assign({
      // 外部 mocker 列表，比如引入npm包或者其他目录下的 mocker
      definedMockers: []
    }, configOpts.mocker);
  }

  // 日志文件存储的路径，默认值为 ${basePath}/logs
  configOpts.LOG_PATH = configOpts.LOG_PATH || path.join(configOpts.basePath, 'logs');

  // matman 启动之后的服务端口号，默认为 3000
  configOpts.port = configOpts.port || 3000;

  return configOpts;
}

module.exports = {
  getConfigOpts: getConfigOpts
};