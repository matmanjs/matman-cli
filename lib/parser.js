'use strict';

const version = '0.0.1';

const _ = require('lodash');
const co = require('co');
const argv = require('minimist')(process.argv.slice(2));
const Matman = require('./matman');

const matman = new Matman(version);

const parseArgs = () => {
    co(function*() {
        const keys = Object.keys(argv);

        // logo
        if (keys.length === 1 && !argv['_'][0]) {
            return matman.printLogo();
        }

        // version
        if (argv['v'] || argv['V'] || argv['version']) {
            return matman.printVersion();
        }

        // help
        if (argv['h'] || argv['H'] || argv['help']) {
            return matman.printHelp();
        }
    });
};

module.exports = parseArgs;