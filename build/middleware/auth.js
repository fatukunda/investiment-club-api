"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../modules/user-management/User"));

var _utils = _interopRequireDefault(require("../utils/utils"));

/* eslint-disable no-underscore-dangle */
var util = new _utils["default"](); // eslint-disable-next-line consistent-return

var auth = function auth(req, res, next) {
  var token;
  return _regenerator["default"].async(function auth$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (req.header('Authorization')) {
            _context2.next = 3;
            break;
          }

          util.setError(401, 'Authorization header is required.');
          return _context2.abrupt("return", util.send(res));

        case 3:
          token = req.header('Authorization').replace('Bearer ', ''); // eslint-disable-next-line consistent-return

          _jsonwebtoken["default"].verify(token, process.env.JWT_KEY, function _callee(err, decoded) {
            var user;
            return _regenerator["default"].async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(err !== null && err.name === 'TokenExpiredError')) {
                      _context.next = 3;
                      break;
                    }

                    util.setError(401, 'Your session has expired. Please login again!');
                    return _context.abrupt("return", util.send(res));

                  case 3:
                    if (!(err !== null && err.name === 'JsonWebTokenError')) {
                      _context.next = 6;
                      break;
                    }

                    util.setError(401, 'Authentication failed.');
                    return _context.abrupt("return", util.send(res));

                  case 6:
                    _context.next = 8;
                    return _regenerator["default"].awrap(_User["default"].findOne({
                      _id: decoded._id
                    }).exec());

                  case 8:
                    user = _context.sent;
                    req.user = user;
                    next();

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = auth;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map