const matman = require('../matman');

function getClientScriptHandler(basePath, buildPath, regMatch) {
  const clientScript = new matman.ClientScript({
    basePath: basePath,
    buildPath: buildPath,
    regMatch: regMatch
  });

  return clientScript;
}

module.exports = {
  getClientScriptHandler: getClientScriptHandler
};