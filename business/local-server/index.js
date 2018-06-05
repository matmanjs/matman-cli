const run = require('./run');

function startServer(opts) {
  run(opts);
}

module.exports = {
  startServer: startServer
};