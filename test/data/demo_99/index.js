const path = require('path');
const localServer = require('../../../business/local-server');

localServer.startServer({
  basePath: __dirname,
  mockServicePath: path.join(__dirname, './mock_service/mockers')
});