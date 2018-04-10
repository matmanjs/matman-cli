const path = require('path');
const matmanCore = require('matman-core');

matmanCore.serialize(path.join(__dirname, './src'), path.join(__dirname, './lib'));
