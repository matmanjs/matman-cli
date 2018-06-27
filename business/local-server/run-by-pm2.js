const spawn = require('cross-spawn');

module.exports = (pm2ConfigFilePath) => {
  console.log('run-by-pm2-file', pm2ConfigFilePath);

  const runPm2 = spawn('pm2', ['start', pm2ConfigFilePath]);

  // 打印输出
  let output = '';

  // 成功信息
  runPm2.stdout.on('data', (data) => {
    output += data;
  }).pipe(process.stdout);

  // 异常信息
  runPm2.stderr.on('data', (data) => {
    output += data;
  }).pipe(process.stderr);

  // 运行结束
  runPm2.on('close', (code) => {
    // console.log({ code: code, data: output });
  });
};
