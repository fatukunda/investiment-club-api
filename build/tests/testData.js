"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUsers = exports.shortPasswordUser = exports.invalidEmailUser = exports.noEmailUser = exports.noPasswordUser = exports.noUsernameUser = exports.validUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _User = _interopRequireDefault(require("../modules/user-management/User"));

// Valid User
var validUser = {
  username: 'testUser',
  email: 'testuser@app.com',
  password: 'test12!@'
}; // User with no username

exports.validUser = validUser;
var noUsernameUser = {
  email: 'testuser@app.com',
  password: 'test12!@'
}; // User with no password

exports.noUsernameUser = noUsernameUser;
var noPasswordUser = {
  username: 'testUser',
  email: 'testuser@app.com'
}; // User with no email

exports.noPasswordUser = noPasswordUser;
var noEmailUser = {
  username: 'testUser',
  password: 'test12!@'
}; // User with invalid email

exports.noEmailUser = noEmailUser;
var invalidEmailUser = {
  username: 'testUser',
  email: 'testuserapp.com',
  password: 'test12!@'
}; // User with a short password

exports.invalidEmailUser = invalidEmailUser;
var shortPasswordUser = {
  username: 'testUser',
  email: 'testuser@app.com',
  password: 'test'
}; // Sample users

exports.shortPasswordUser = shortPasswordUser;
var user1 = {
  username: 'user1',
  email: 'user1@app.com',
  password: 'testuser1!@'
};
var user2 = {
  username: 'user2',
  email: 'user2@app.com',
  password: 'testuser2!@'
}; // Function to create users for each test

var createUsers = function createUsers() {
  return _regenerator["default"].async(function createUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(_User["default"].deleteMany());

        case 2:
          _context.next = 4;
          return _regenerator["default"].awrap(_User["default"].create(user1));

        case 4:
          _context.next = 6;
          return _regenerator["default"].awrap(_User["default"].create(user2));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createUsers = createUsers;
//# sourceMappingURL=testData.js.map