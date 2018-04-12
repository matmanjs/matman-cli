'use strict';

const path = require('path');

const Promise = require('bluebird');
const fse = require('fs-extra');

module.exports = function (args) {
  console.log(args);

  return Promise.resolve();
};
