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

              if (_context.t0.errors.password) {
                errorMessage = _context.t0.errors.password.message;
              } else if (_context.t0.errors.email) {
                errorMessage = _context.t0.errors.email.message;
              } else if (_context.t0.errors.username) {
                errorMessage = _context.t0.errors.username.message;
              }

              util.setError(400, errorMessage);
              return _context.abrupt("return", util.send(res));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  }]);
  return UserController;
}();

exports["default"] = UserController;
//# sourceMappingURL=userController.js.map