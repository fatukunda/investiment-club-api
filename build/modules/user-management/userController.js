"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _userService = _interopRequireDefault(require("./userService"));

/* eslint-disable no-tabs */

/* eslint-disable no-mixed-spaces-and-tabs */
var util = new _utils["default"]();

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "createUser",
    value: function createUser(req, res) {
      var userInfo, createdUser, errorMessage;
      return _regenerator["default"].async(function createUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userInfo = req.body;
              _context.prev = 1;
              _context.next = 4;
              return _regenerator["default"].awrap(_userService["default"].createUser(userInfo));

            case 4:
              createdUser = _context.sent;
              util.setSuccess(201, 'User created!', createdUser);
              return _context.abrupt("return", util.send(res));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              errorMessage = '';

              if (_context.t0.errors.email) {
                errorMessage = _context.t0.errors.email.message;
              }

              if (_context.t0.errors.email && _context.t0.errors.email.kind === 'unique') {
                errorMessage = _context.t0.errors.email.message;
              }

              if (_context.t0.errors.email && _context.t0.errors.email.kind === 'required') {
                errorMessage = _context.t0.errors.email.message;
              }

              if (_context.t0.errors.password) {
                errorMessage = _context.t0.errors.password.message;
              }

              if (_context.t0.errors.username && _context.t0.errors.username.kind === 'unique') {
                errorMessage = _context.t0.errors.username.message;
              }

              if (_context.t0.errors.username && _context.t0.errors.username.kind === 'required') {
                errorMessage = _context.t0.errors.username.message;
              }

              util.setError(400, errorMessage);
              return _context.abrupt("return", util.send(res));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var loginInfo, user;
      return _regenerator["default"].async(function loginUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              loginInfo = req.body;
              _context2.next = 3;
              return _regenerator["default"].awrap(_userService["default"].loginUser(loginInfo));

            case 3:
              user = _context2.sent;

              if (!user.error) {
                _context2.next = 7;
                break;
              }

              util.setError(400, user.error);
              return _context2.abrupt("return", util.send(res));

            case 7:
              util.setSuccess(200, 'Logged in successfully!', user);
              return _context2.abrupt("return", util.send(res));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "viewUserProfile",
    value: function viewUserProfile(req, res) {
      var user;
      return _regenerator["default"].async(function viewUserProfile$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator["default"].awrap(req.user);

            case 2:
              user = _context3.sent;
              util.setSuccess(200, 'User Profile', user);
              return _context3.abrupt("return", util.send(res));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);
  return UserController;
}();

exports["default"] = UserController;
//# sourceMappingURL=userController.js.map