const request = require('superagent');

request
  .get('http://localhost:3000/sys-cgi/mocker')
  .then((response) => {
    console.log(response.res.text);
  });