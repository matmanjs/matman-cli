webpackJsonp([0],{

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(853);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    'div',
    { className: 'home' },
    _react2.default.createElement(
      'h2',
      null,
      'Home'
    ),
    _react2.default.createElement(
      'p',
      null,
      '\u6B22\u8FCE\u4F7F\u7528 ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/matmanjs/matman', target: '_blank' },
        'matman'
      ),
      '\uFF0C\u6B22\u8FCE\u7ED9\u6211\u4EEC\u63D0 ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/matmanjs/matman/issues', target: '_blank' },
        'Issues'
      ),
      '\uFF01'
    )
  );
};

exports.default = Home;

/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(854);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(19)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../node_modules/css-loader/index.js??ref--2-1!../../../../../../node_modules/less-loader/dist/cjs.js??ref--2-2!./index.less", function() {
		var newContent = require("!!../../../../../../node_modules/css-loader/index.js??ref--2-1!../../../../../../node_modules/less-loader/dist/cjs.js??ref--2-2!./index.less");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
exports.push([module.i, ".home h2 {\n  color: green;\n}\n", ""]);

/***/ })

});
//# sourceMappingURL=0.chunk.js.map