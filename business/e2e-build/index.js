const matman = require('../matman');

function getEntry(basePath, buildPath, regMatch) {
  const clientScript = new matman.ClientScript({
    basePath: basePath,
    buildPath: buildPath,
    regMatch: regMatch
  });

  return clientScript.entry;
}

module.exports = {
  getEntry: getEntry
};