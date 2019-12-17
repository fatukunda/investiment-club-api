"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = require("validator");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/* eslint-disable func-names */

/* eslint-disable no-underscore-dangle */
var userSchema = _mongoose["default"].Schema({
  email: {
    type: String,
    validate: {
      validator: _validator.isEmail,
      message: '{VALUE} is not a valid email.',
      isAsync: false
    },
    required: [true, 'Email is required.'],
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password should have more than 6 characters.'],
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.pre('save', function _callee(next) {
  var user;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Hash the password before saving the user model
          user = this;

          if (!user.isModified('password')) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return _regenerator["default"].awrap(_bcryptjs["default"].hash(user.password, 8));

        case 4:
          user.password = _context.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

userSchema.methods.generateAuthToken = function _callee2() {
  var user, token;
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Generate an auth token for the user
          user = this;
          token = _jsonwebtoken["default"].sign({
            _id: user._id
          }, process.env.JWT_KEY);
          user.tokens = user.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return _regenerator["default"].awrap(user.save());

        case 5:
          return _context2.abrupt("return", token);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

userSchema.statics.findByCredentials = function _callee3(email, password) {
  var user, isPasswordMatch;
  return _regenerator["default"].async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator["default"].awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 5;
            break;
          }

          throw new Error({
            error: 'Invalid login credentials'
          });

        case 5:
          _context3.next = 7;
          return _regenerator["default"].awrap(_bcryptjs["default"].compare(password, user.password));

        case 7:
          isPasswordMatch = _context3.sent;

          if (isPasswordMatch) {
            _context3.next = 10;
            break;
          }

          throw new Error({
            error: 'Invalid login credentials'
          });

        case 10:
          return _context3.abrupt("return", user);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=User.js.map