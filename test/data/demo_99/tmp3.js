const request = require('superagent');

request
  .get('http://localhost:9527/cgi-bin/a/b/demo_basic')
    .query(null)
    .withCredentials()
  .then((response) => {
    console.log(response.res.text);
  });
