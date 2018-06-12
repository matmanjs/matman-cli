const path = require('path');
const localServer = require('../../../business/local-server');

localServer.startServer({
  basePath: __dirname,
  dbPath: path.resolve(__dirname, './app'),
  mockServerPath: path.resolve(__dirname, '../fixtures/mock_server/mockers'),
});