'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var nPath = require('path');

var itemType = function itemType(stat) {
  if (stat.isFile()) {
    return 'file';
  }

  if (stat.isDirectory()) {
    return 'dir';
  }

  return '';
};

var directoryTree = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __dirname;
    var onEachFile = arguments[1];
    var name, item, stat, recurse, setChildren;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = nPath.basename(path);
            item = { path: path, name: name };
            _context2.prev = 2;
            _context2.next = 5;
            return fs.stat(path);

          case 5:
            stat = _context2.sent;
            _context2.t0 = itemType(stat);
            _context2.next = _context2.t0 === 'file' ? 9 : _context2.t0 === 'dir' ? 17 : 35;
            break;

          case 9:
            item.extension = nPath.extname(item.path).toLowerCase();
            item.size = stat.size;
            item.isFile = true;

            if (!(onEachFile && typeof onEachFile === 'function')) {
              _context2.next = 16;
              break;
            }

            _context2.next = 15;
            return onEachFile(item);

          case 15:
            item = _context2.sent;

          case 16:
            return _context2.abrupt('break', 36);

          case 17:
            _context2.prev = 17;
            _context2.next = 20;
            return fs.readdir(path);

          case 20:
            item.children = _context2.sent;

            item.isFile = false;

            recurse = function recurse(child) {
              return new _promise2.default(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(res, rej) {
                  var i;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return directoryTree(nPath.join(path, child), onEachFile);

                        case 3:
                          i = _context.sent;

                          res(i);
                          _context.next = 10;
                          break;

                        case 7:
                          _context.prev = 7;
                          _context.t0 = _context['catch'](0);

                          res({});

                        case 10:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined, [[0, 7]]);
                }));

                return function (_x2, _x3) {
                  return _ref2.apply(this, arguments);
                };
              }());
            };

            setChildren = item.children.map(function (child) {
              return recurse(child).then(function (c) {
                return c;
              });
            });
            _context2.next = 26;
            return _promise2.default.all(setChildren);

          case 26:
            item.children = _context2.sent;

            item.children = item.children.filter(function (i) {
              return (0, _keys2.default)(i).length;
            }); // don't include empty items
            item.size = item.children.reduce(function (prev, cur) {
              return prev + cur.size;
            }, 0);
            _context2.next = 34;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t1 = _context2['catch'](17);
            return _context2.abrupt('return', {});

          case 34:
            return _context2.abrupt('break', 36);

          case 35:
            return _context2.abrupt('return', {});

          case 36:
            _context2.next = 41;
            break;

          case 38:
            _context2.prev = 38;
            _context2.t2 = _context2['catch'](2);
            return _context2.abrupt('return', {});

          case 41:
            return _context2.abrupt('return', item);

          case 42:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 38], [17, 31]]);
  }));

  return function directoryTree() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = directoryTree;
//# sourceMappingURL=directory-tree.js.map