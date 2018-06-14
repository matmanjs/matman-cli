const request = require('superagent');

request
  .get('http://localhost:9527/matman-cgi/mocker')
  .then((response) => {
    console.log(response.res.text);
  });
