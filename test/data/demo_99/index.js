const path = require('path');
const localServer = require('../../../business/local-server');

localServer.startServer({
  basePath: __dirname,
  mockServerPath: path.join(__dirname, './mock_server/mockers')
});