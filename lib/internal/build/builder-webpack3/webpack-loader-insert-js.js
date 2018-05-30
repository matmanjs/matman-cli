module.exports = function (source, inputSourceMap) {
    this.cacheable && this.cacheable();

    let callback = this.async();

    let code = `
        window.e2ex=${Date.now()};
    `;

    callback(null, code + source);
};