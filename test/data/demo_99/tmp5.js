var p = require('pfork');
const path = require('path');

var options = {
  script: path.resolve(__dirname, './pfork-script.js'), //必填
  // value: '/User/xxx/test/server.js',  //可选
  myt: 'myttttt'
};

//会根据script和value自动去重
p.fork(options, function (err, data, child) {
  console.log(err, data, child);
  //启动结束
  child.on('data', function (data) {
    console.log('==data==', data);
  });
  //
  // child.sendData(data);
  //
  // child.on('exit', function () {
  //   console.log('==exit==');
  // }); //退出的时候

});

console.log(p.exists(options));

setTimeout(() => {
  console.log('---kill--');
  p.kill(options);
  console.log(p.exists(options));
}, 1000 * 5);