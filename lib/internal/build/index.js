'use strict';

module.exports = function (ctx) {

  const cmd = ctx.cmd;

  cmd.register('build', 'Convert local handler to npm package', {}, require('./build'));
  cmd.register('build-module', 'Convert local handler to standard handler', {}, require('./build-module'));
};
