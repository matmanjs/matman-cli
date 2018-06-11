const path = require('path');
const localServer = require('../../../business/local-server');

localServer.startServer({
  basePath: __dirname,
  mockServerPath: path.resolve(__dirname, '../fixtures/mock_server/mockers')
});