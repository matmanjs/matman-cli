const mockerRouter = require('./mocker/router');
// const reporterRouter = require('../../plugins/reporter/router');
// const stubRouter = require('../../plugins/stub/router');

module.exports = (router, mockerParser) => {

  // 初始化 mocker
  mockerRouter(router, mockerParser);

  // 初始化 reporter
  // reporterRouter(router, handlerParser);
  //
  // // 初始化 stub
  // stubRouter(router, handlerParser);

};
