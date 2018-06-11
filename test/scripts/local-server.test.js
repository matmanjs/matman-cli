const request = require('superagent');
const { expect } = require('chai');

describe('local-server', () => {
  describe('check /matman-cgi/mocker', () => {
    let data;

    before(function () {
      return request
        .get('http://localhost:3000/matman-cgi/mocker')
        .then((response) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return array and length is 2', () => {
      expect(data).to.be.a('array').and.have.lengthOf(2);
    });

    it('should exist name_demo_basic', () => {
      let filterResult = data.filter(item => item.name === 'name_demo_basic');
      let target = filterResult[0];

      expect(filterResult).to.be.a('array').and.have.lengthOf(1);
      expect(target.mockModuleList).to.be.a('array').and.have.lengthOf(5);
      expect(target.config).to.eql({
        'name': 'name_demo_basic',
        'route': '/cgi-bin/a/b/demo_basic',
        'description': 'description_demo_basic',
        'disable': false,
        'defaultModule': 'success_1',
        'activeModule': 'success_1',
        'method': 'get',
        'priority': 0,
        'tags': [
          '全部'
        ]
      });
    });
  });
});