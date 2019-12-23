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

var _validator = require("../../utils/validator");

var _multer = require("../../middleware/multer");

var _cloudinary = require("../../config/cloudinary");

/* eslint-disable consistent-return */

/* eslint-disable no-underscore-dangle */

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
              errorMessage = (0, _validator.userRegistrationValidator)(_context.t0);
              util.setError(400, errorMessage);
              return _context.abrupt("return", util.send(res));

            case 14:
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
  }, {
    key: "createUserProfile",
    value: function createUserProfile(req, res) {
      var profileInfo, user, acceptedEditOptions, receivedOptions, isUpdateOption, errorMessage;
      return _regenerator["default"].async(function createUserProfile$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              profileInfo = req.body;
              user = req.user;
              acceptedEditOptions = ['firstName', 'lastName', 'dob', 'gender', 'phoneNumber', 'address'];
              receivedOptions = Object.keys(profileInfo);
              isUpdateOption = receivedOptions.every(function (option) {
                return acceptedEditOptions.includes(option);
              });

              if (isUpdateOption) {
                _context4.next = 8;
                break;
              }

              util.setError(400, 'One of the fields is not a valid update field.');
              return _context4.abrupt("return", util.send(res));

            case 8:
              _context4.prev = 8;
              // eslint-disable-next-line no-return-assign
              receivedOptions.forEach(function (option) {
                return user[option] = profileInfo[option];
              });
              _context4.next = 12;
              return _regenerator["default"].awrap(user.save());

            case 12:
              util.setSuccess(200, 'User profile updated successfully!', user);
              return _context4.abrupt("return", util.send(res));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](8);
              errorMessage = (0, _validator.profileValidator)(_context4.t0);
              util.setError(400, errorMessage);
              return _context4.abrupt("return", util.send(res));

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[8, 16]]);
    }
  }, {
    key: "uploadAvatar",
    value: function uploadAvatar(req, res) {
      var file, result, avatarUrl, userAvatar;
      return _regenerator["default"].async(function uploadAvatar$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!req.file) {
                _context5.next = 18;
                break;
              }

              file = (0, _multer.dataUri)(req).content;
              _context5.prev = 2;
              _context5.next = 5;
              return _regenerator["default"].awrap(_cloudinary.uploader.upload(file));

            case 5:
              result = _context5.sent;
              avatarUrl = result.url;
              _context5.next = 9;
              return _regenerator["default"].awrap(_userService["default"].uploadAvatar(req.user._id, avatarUrl));

            case 9:
              userAvatar = _context5.sent;
              util.setSuccess(200, 'Profile picture uploaded successfully!', {
                avatar: userAvatar
              });
              return _context5.abrupt("return", util.send(res));

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](2);
              util.setError(400, _context5.t0.message);
              return _context5.abrupt("return", util.send(res));

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[2, 14]]);
    }
  }]);
  return UserController;
}();

exports["default"] = UserController;
//# sourceMappingURL=userController.js.map