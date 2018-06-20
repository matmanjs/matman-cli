const path = require('path');
const localServer = require('../../../business/local-server');

localServer.startServer({
  rootPath: __dirname,
  buildPath: path.resolve(__dirname, './app'),
  mockServerPath: path.resolve(__dirname, '../../../../matman/test/data/fixtures/mock_service/mockers'),
});