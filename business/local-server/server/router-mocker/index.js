const express = require('express');
const methodOverride = require('method-override');
const _ = require('lodash');
const request = require('request');
const bodyParser = require('../body-parser');
// const HandlerParser = require('../../parser/handler-parser2').default;
const MockerParser = require('../../../../../matman/src/mocker/MockerParser');
const initPlugins = require('./plugins');
const mockerUtil = require('../../../../../matman/src/mocker/util');

module.exports = (entry) => {
  const mockerParser = new MockerParser({
    basePath: entry.mockServerPath
  });

  let mockerList = mockerParser.getAllMocker();

  // Create router
  // http://expressjs.com/en/4x/api.html#router
  const router = express.Router();

  // Add middlewares
  router.use(methodOverride());
  router.use(bodyParser);

  // Expose render
  router.render = (req, res) => {
    res.jsonp(res.locals.data);
  };

  // 初始化插件
  initPlugins(router, mockerParser);

  // 所有的请求都会经过这里，可以做一些类似权限控制的事情
  router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  // 根据用户配置的路由关系，进行解析
  // console.log('mockerList', mockerList);
  mockerList.forEach((mockerItem) => {
    // console.log(mockerData);

    // mocker 的配置项在其 config 字段中
    const mockerConfig = mockerItem.config;

    // 判断是否存在 route 字段，如果没有，则不再处理
    const ROUTE_PATH = mockerConfig.route;
    if (!ROUTE_PATH) {
      // TODO 返回
    }

    // 默认是 get 请求，除非定义 method 字段
    const METHOD = (mockerConfig.method || 'get').toLowerCase();

    // http://expressjs.com/en/4x/api.html#router.METHOD
    router[METHOD](ROUTE_PATH, function (req, res, next) {
      // Express的req对象，详见 http://expressjs.com/en/4x/api.html#req

      // post 请求
      // handlerData.route="/cgi-bin/a/b/post_cgi"
      // post http://localhost:3000/cgi-bin/a/b/post_cgi data={activeModule:"error_not_login"}
      // req.baseUrl=""
      // req.originalUrl="/cgi-bin/a/b/post_cgi"
      // req.url="/cgi-bin/a/b/post_cgi"
      // req.method="POST"
      // req.OriginalMethod="POST"
      // req.body.activeModule = "error_not_login"
      // req.body = data

      // get 请求
      // handlerData.route="/cgi-bin/a/b/simple_cgi"
      // get http://localhost:3000/cgi-bin/a/b/simple_cgi?activeModule=error_not_login
      // req.baseUrl=""
      // req.originalUrl="/cgi-bin/a/b/simple_cgi?activeModule=error_not_login"
      // req.url="/cgi-bin/a/b/simple_cgi?activeModule=error_not_login"
      // req.method="GET"
      // req.OriginalMethod="GET"
      // req.query.activeModule = "error_not_login"

      // get 请求且route为匹配类型
      // handlerData.route="/cgi-bin/a/b/id/:id"
      // get http://localhost:3000/cgi-bin/a/b/id/1?activeModule=error_not_login
      // req.baseUrl=""
      // req.originalUrl="/cgi-bin/a/b/id/1?activeModule=error_not_login"
      // req.url="/cgi-bin/a/b/id/1?activeModule=error_not_login"
      // req.method="GET"
      // req.OriginalMethod="GET"
      // req.query.activeModule = "error_not_login"
      // req.params.id = "1"

      // console.log(req.headers.referer)

      let isDisabled;

      // 判断该路由的名字是否在referer中
      let matmanQueryItem = mockerUtil.getMatmanQueryItem(req.headers.referer, mockerItem.name);
      // console.log('====matmanQueryItem=====', matchedReferer);

      if (matmanQueryItem) {
        // referer 里面的请求参数拥有最高优先级，因为这种场景比较特殊，主要用于自动化测试之用
        isDisabled = matmanQueryItem.isDisabled();
      } else {
        // 从请求 req 或者 config.json 文件中检查当前请求是否需要禁用 mock 服务
        isDisabled = req.query._m_disable || req.body._m_disable;
        if (!isDisabled) {
          // 此处要重新获取新的数据，以便取到缓存的。
          // TODO 此处还可以优化，比如及时更新缓存中的数据，而不需要每次都去获取
          let curMockerData = mockerParser.getMockerByName(mockerItem.name, true);
          isDisabled = curMockerData.disable;
        }
      }

      if (isDisabled) {
        // 如果当前禁用了 handle 服务，则不处理
        res.locals.isDisabled = true;
        res.locals.mockerName = mockerItem.name;
        next();
      } else {
        let url = ROUTE_PATH;
        let params = (METHOD === 'post') ? req.body : req.query;

        // 还要合并一下来自 url path 中的参数值
        // referer 里面的请求参数拥有最高优先级，因为这种场景比较特殊，主要用于自动化测试之用
        params = _.merge({}, params, req.params, matmanQueryItem);

        const resInfo = mockerParser.getResInfoByRoute(url, params);

        if (!resInfo) {
          let errMsg = 'Could not get reqInfo by route=' + url + ' and params=' + JSON.stringify(params);
          console.error(errMsg);
          res.status(500).send(errMsg);
          return;
        }

        resInfo.mockModuleItem.getResult(params, req)
          .then((result) => {
            // 增加特定标记，以便抓包时能够识别是否为打桩数据
            res.append('x-matman-mocker', resInfo.mockerItem.name);
            res.append('x-matman-mock-module', resInfo.mockModuleItem.name);

            // 延时返回
            let delay = resInfo.mockModuleItem.config.delay || 0;
            res.append('x-matman-delay', delay + '');

            if (delay) {
              setTimeout(() => {
                res.jsonp(result);
              }, delay);
            } else {
              res.jsonp(result);
            }
          })
          .catch((err) => {
            // 注意 err 有可能是 Error 对象，也可能是普通的字符串或对象
            let errMsg = err && err.stack || err;

            console.error(errMsg);

            res.status(500).send(errMsg);
          });
      }

    });
  });

  router.use((req, res) => {
    // get 请求
    // get http://localhost:3000/cgi-bin/a/b/not_exist_cgi?activeModule=error_not_login
    // req.headers.host="localhost:3000"
    // req.params[0]="/cgi-bin/a/b/not_exist_cgi"
    // req.baseUrl=""
    // req.originalUrl="/cgi-bin/a/b/not_exist_cgi?activeModule=error_not_login"
    // req.url="/cgi-bin/a/b/not_exist_cgi?activeModule=error_not_login"
    // req.method="GET"
    // req.OriginalMethod="GET"
    // req.query.activeModule = "error_not_login"

    // post 请求
    // post http://localhost:3000/cgi-bin/a/b/not_exist_cgi data={activeModule:"error_not_login"}
    // req.params[0]="/cgi-bin/a/b/not_exist_cgi"
    // req.baseUrl=""
    // req.originalUrl="/cgi-bin/a/b/not_exist_cgi"
    // req.url="/cgi-bin/a/b/not_exist_cgi"
    // req.method="POST"
    // req.OriginalMethod="POST"
    // req.body.activeModule = "error_not_login"

    // 未匹配到的请求将会来到这里
    // console.log('[use]', req.url, req.query._m_from);

    // 判断是否已经是第二次请求了。
    // 请求本地服务的时候，可能会陷入死循环中，因此此处校验最多只请求一次。
    const isRequested = !!req.query._m_from;

    const opts = {
      url: 'http://' + req.headers.host + req.url,
      headers: req.headers,
      jar: true,
      // timeout: 4000,
      qs: {
        _m_from: 1
      }
    };

    if (res.locals.isDisabled) {
      res.append('matman-disable', res.locals.handlerName);
    }

    if (req.method === 'GET' && !isRequested) {
      request
        .get(_.merge({}, opts))
        .on('response', function (response) {
          // console.log(response.statusCode) // 200
        })
        .on('error', function (err) {
          console.error(err);
          res.status(500).send(err.stack);
        })
        .pipe(res);
    } else if (req.method === 'POST' && !isRequested) {
      request
        .post(_.merge({}, opts, {
          form: req.body
        }))
        .on('response', function (response) {
          // console.log(response.statusCode)
        })
        .on('error', function (err) {
          console.error(err);
          res.status(500).send(err.stack);
        })
        .pipe(res);
    } else {
      if (!res.locals.data) {
        res.status(404);
        res.locals.data = {};
      }

      // TODO 2018/6/11 helinjiang: 要优化下这里，正常应该是404的，不知道为什么会走到这里
      router.render(req, res);
    }

  });

  router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
  });

  // 携带变量出去
  router._handlerParser = mockerParser;

  return router;
};
