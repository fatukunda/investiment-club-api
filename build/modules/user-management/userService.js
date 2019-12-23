"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _User = _interopRequireDefault(require("./User"));

/* eslint-disable no-useless-catch */
var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
  }

  (0, _createClass2["default"])(UserService, null, [{
    key: "createUser",

    /**
       * @param  {object} userInfo
       * @returns {Promise}
       * @description Creates a new user and user token and returns both
       */
    value: function createUser(userInfo) {
      var user, token;
      return _regenerator["default"].async(function createUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              user = new _User["default"](userInfo);
              _context.next = 4;
              return _regenerator["default"].awrap(user.save());

            case 4:
              _context.next = 6;
              return _regenerator["default"].awrap(user.generateAuthToken());

            case 6:
              token = _context.sent;
              return _context.abrupt("return", {
                user: user,
                token: token
              });

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
    /**
       * @param  {object} loginInfo
       * @returns {Promise}
       * @description Takes in username and password and returns a user and the auth token.
       */

  }, {
    key: "loginUser",
    value: function loginUser(loginInfo) {
      var username, password, user, token;
      return _regenerator["default"].async(function loginUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              username = loginInfo.username, password = loginInfo.password;
              _context2.prev = 1;
              _context2.next = 4;
              return _regenerator["default"].awrap(_User["default"].findByCredentials(username, password));

            case 4:
              user = _context2.sent;

              if (!user.error) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", user);

            case 7:
              _context2.next = 9;
              return _regenerator["default"].awrap(user.generateAuthToken());

            case 9:
              token = _context2.sent;
              return _context2.abrupt("return", {
                user: user,
                token: token
              });

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              throw _context2.t0;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 13]]);
    } // eslint-disable-next-line consistent-return

  }, {
    key: "uploadAvatar",
    value: function uploadAvatar(userId, avatarUrl) {
      var user;
      return _regenerator["default"].async(function uploadAvatar$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _regenerator["default"].awrap(_User["default"].findById(userId));

            case 3:
              user = _context3.sent;

              if (!user) {
                _context3.next = 9;
                break;
              }

              user.avatar = avatarUrl;
              _context3.next = 8;
              return _regenerator["default"].awrap(user.save());

            case 8:
              return _context3.abrupt("return", user.avatar);

            case 9:
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }]);
  return UserService;
}();

var _default = UserService;
exports["default"] = _default;
//# sourceMappingURL=userService.js.map