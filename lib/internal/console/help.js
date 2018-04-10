'use strict';
const meow = require('meow');

module.exports = function (args) {
  const cli = meow(`
    Usage: matman [options] [command]

    Commands:
        init                                 Choose a boilerplate to initialize project.
        build    <srcPath>   <distPath>      Convert local handler to npm package.

    Options:
        --version, -[v]           Print version and exit successfully.
        --help, -[h]              Print this help and exit successfully.

    Report bugs to https://github.com/helinjiang/matman-cli/issues.
  `);

  return cli.showHelp(0);
};