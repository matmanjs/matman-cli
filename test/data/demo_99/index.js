const path = require('path');
const localServer = require('../../../business/local-server');

localServer.startServer({
  basePath: __dirname,
  dataPath: path.resolve(__dirname, './app'),
  mockServerPath: path.resolve(__dirname, '../../../../matman/test/data/fixtures/mock_service/mockers'),
});