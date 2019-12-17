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
  }]);
  return UserService;
}();

var _default = UserService;
exports["default"] = _default;
//# sourceMappingURL=userService.js.map