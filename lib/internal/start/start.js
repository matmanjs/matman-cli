'use strict';

const path = require('path');

const Promise = require('bluebird');
const fse = require('fs-extra');

module.exports = function (args) {
  // node ./bin/matman start a.js --name=hello -w
  // { _: [ 'a.js' ], name: 'hello', w: true }
  console.log(args);

  return Promise.resolve();
};
