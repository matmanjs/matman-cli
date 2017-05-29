const path = require('path');
const { expect } = require('chai');
const execa = require('execa');
const fs = require('fs');
const fse = require('fs-extra');

const ROOT_PROJECT = path.join(__dirname, '../../');
const ROOT_TEST = path.join(ROOT_PROJECT, './test');
const FIXTURE_PATH = path.join(ROOT_TEST, './data/fixtures/convert');

describe('command:convert', () => {
    const cli = path.join(ROOT_PROJECT, './bin/matman-convert');
    let originalCwd = process.cwd();
    const TMP_FOLDER = 'dist';

    function setup() {
        process.chdir(FIXTURE_PATH);
    }

    function teardown(done) {
        fse.removeSync(TMP_FOLDER);
        process.chdir(originalCwd);
        done();
    }

    describe('convert one file', () => {
        let execaResult;
        let files;

        const TARGET_PATH = 'return-plain-object.js';
        const SAVE_PATH = path.join(TMP_FOLDER, 'return-plain-object.json');

        before(done => {
            setup();

            execa(cli, [TARGET_PATH, '--out-file=' + SAVE_PATH])
                .then(res => {
                    execaResult = res;
                    files = fs.readdirSync(TMP_FOLDER);
                    done();
                })
                .catch(done);
        });

        after(teardown);

        it('convert with expected files', done => {
            // 命令运行成功
            expect(execaResult.code).to.equal(0);

            // 生成了一个文件
            expect(files.length).to.equal(1);

            done();
        });
    });

    describe('convert dir', () => {
        let execaResult;
        let files;

        const TARGET_PATH = FIXTURE_PATH;
        const SAVE_PATH = path.join(TMP_FOLDER);

        before(done => {
            setup();

            execa(cli, [TARGET_PATH, '--out-dir=' + SAVE_PATH])
                .then(res => {
                    execaResult = res;
                    files = fs.readdirSync(TMP_FOLDER);
                    done();
                })
                .catch(done);
        });

        after(teardown);

        it('convert with expected files', done => {
            // 命令运行成功
            expect(execaResult.code).to.equal(0);

            // 生成了2个文件
            expect(files.length).to.equal(2);

            done();
        });
    });
});