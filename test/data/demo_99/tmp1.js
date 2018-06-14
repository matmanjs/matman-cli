const express = require('express');
const request = require('supertest');

let app = new express();

app.use(function (req, res, next) {
  res.status(200).send({ name: 'gogo' });
  next();
});

request(app)
  .get('/')
  .expect(200)
  .then((response) => {
    console.log(response.res.text);
  });
