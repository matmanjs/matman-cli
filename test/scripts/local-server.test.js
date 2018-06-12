const request = require('superagent');
const { expect } = require('chai');

describe('local-server', () => {
  describe('check /matman-cgi/mocker', () => {
    let data;

    before(function () {
      return request
        .get('http://localhost:9527/matman-cgi/mocker')
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
        'routeExtra': {},
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

  describe('check /matman-cgi/mocker/:mockerName ', () => {
    let data;

    before(function () {
      return request
        .get('http://localhost:9527/matman-cgi/mocker/name_demo_basic')
        .then((response) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return object', () => {
      expect(data).to.be.a('object').and.have.all.keys('basePath', 'name', 'mockModuleList', 'config');
    });

    it('should exist target.mockModuleList', () => {
      expect(data.mockModuleList).to.be.a('array').and.have.lengthOf(5);
    });

    it('should exist target.config', () => {
      expect(data.config).to.eql({
        'name': 'name_demo_basic',
        'route': '/cgi-bin/a/b/demo_basic',
        'routeExtra': {},
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

  describe('return active module result', () => {
    let data;

    before(function () {
      return request
        .get('http://localhost:9527/cgi-bin/a/b/demo_basic')
        .then((response) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        'retcode': 0,
        'result': {
          'result': 1,
          'other': 'other'
        }
      });
    });
  });

  describe('return target mock module result', () => {
    let data;

    before(function () {
      return request
        .get('http://localhost:9527/cgi-bin/a/b/demo_basic?_m_target=success_2')
        .then((response) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        "result": 2
      });
    });
  });
});