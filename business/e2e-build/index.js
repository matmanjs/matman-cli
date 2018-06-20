const matman = require('../matman');

function getClientScriptHandler(rootPath, buildPath, regMatch) {
  const clientScript = new matman.ClientScript({
    rootPath: rootPath,
    buildPath: buildPath,
    regMatch: regMatch
  });

  return clientScript;
}

module.exports = {
  getClientScriptHandler: getClientScriptHandler
};