const express = require('express');

module.exports = {
  create: () => express().set('json spaces', 2),
  handlerServer: require('./handler-server'),
  routerMocker: require('./router/index'),
  bodyParser: require('./body-parser')
};
