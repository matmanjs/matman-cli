'use strict';
const meow = require('meow');

module.exports = function (args) {
  const cli = meow(`
    Usage: matman [options] [command]

    Commands:
        init                                     Choose a boilerplate to initialize project.
        build         <srcPath>                  Convert local handler to npm package.
        build-handler <srcPath> <distPath> [-sa] Convert local handler to standard handler.
        start         <entryPath>          [-w]  Start matman service.

    Options:
        --version, -[v]           Print version and exit successfully.
        --help, -[h]              Print this help and exit successfully.
        --watch, -[w]             Watch file changes.
        --name                    Name.

    Report bugs to https://github.com/helinjiang/matman-cli/issues.
  `);

  return cli.showHelp(0);
};
