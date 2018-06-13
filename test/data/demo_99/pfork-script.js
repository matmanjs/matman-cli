const path = require('path');
const localServer = require('../../../business/local-server');

//options与fork的options字段一致
module.exports = function (options, callback) {
  localServer.startServer({
    basePath: __dirname,
    dataPath: path.resolve(__dirname, './app'),
    mockServerPath: path.resolve(__dirname, '../../../../matman/test/data/fixtures/mock_service/mockers')
  });

  //do sth
  let data = {
    myo: options
  };
  // process.sendData(data);

  callback(null, data);
};