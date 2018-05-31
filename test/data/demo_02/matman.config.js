const path = require('path');

module.exports = {
  ROOT_PATH: __dirname,
  srcPath: path.join(__dirname, 'src'),
  distPath: path.join(__dirname, 'dist'),
  srcClientPath: path.join(__dirname, 'src-client-script'),
  distClientPath: path.join(__dirname, 'dist-client-script'),
  entryRelativePath: './client',

};
