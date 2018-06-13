const request = require('superagent');

// request
//   .get('http://localhost:9527/matman-admin/mockers/demo_03/static/sub/workflow1.png')
//   .then((response) => {
//     // 200
//     console.log(response.status);
//
//     // image/png
//     console.log(response.type);
//
//     // 21871
//     console.log(response.body.length);
//
//   });

request
  .get('http://localhost:9527/matman-admin/mockers/demo_03/static/logo.jpg')
  .then((response) => {
    // 200
    console.log(response.status);

    // image/png
    console.log(response.type);

    // 21871
    console.log(response.body.length);

  });