const request = require('superagent');
const { expect } = require('chai');

describe('local-server', () => {
  describe('check /sys-cgi/mocker', () => {
    let data;

    before(function () {
      return request
        .get('http://localhost:3000/sys-cgi/mocker')
        .then((response) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return array and length is 2', () => {
      expect(data).to.be.a('array').and.have.lengthOf(2);
    });
  });
});