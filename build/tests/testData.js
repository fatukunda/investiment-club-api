"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidToken = exports.generateToken = exports.createUsers = exports.invalidPhoneNumber = exports.invalidGender = exports.invalidDob = exports.invalidLastName = exports.invalidFirstName = exports.invalidProfileData = exports.userProfileData = exports.user1 = exports.shortPasswordUser = exports.invalidEmailUser = exports.noEmailUser = exports.noPasswordUser = exports.noUsernameUser = exports.existingUserName = exports.validUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../modules/user-management/User"));

// eslint-disable-next-line no-underscore-dangle
var _id = _mongoose["default"].Types.ObjectId(); // Valid User


var validUser = {
  username: 'testUser',
  email: 'testuser@app.com',
  password: 'test12!@'
};
exports.validUser = validUser;
var existingUserName = {
  username: 'testUser',
  email: 'testuser1@app.com',
  password: 'test12!@'
}; // User with no username

exports.existingUserName = existingUserName;
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
  _id: _id,
  username: 'user1',
  email: 'user1@app.com',
  password: 'testuser1!@'
};
exports.user1 = user1;
var user2 = {
  username: 'user2',
  email: 'user2@app.com',
  password: 'testuser2!@'
};
var userProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '02.17.2004',
  address: 'Ntinda, Kampala',
  gender: 'male',
  phoneNumber: '+256716565142'
};
exports.userProfileData = userProfileData;
var invalidProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '02.17.2004',
  location: 'Ntinda, Kampala',
  gender: 'male',
  phoneNumber: '+256716565142'
};
exports.invalidProfileData = invalidProfileData;
var invalidFirstName = {
  firstName: 34542525,
  lastName: 'Doe'
};
exports.invalidFirstName = invalidFirstName;
var invalidLastName = {
  firstName: 'John',
  lastName: 456536356
};
exports.invalidLastName = invalidLastName;
var invalidDob = {
  firstName: 'John',
  lastName: 'Doe',
  dob: 'invalid'
};
exports.invalidDob = invalidDob;
var invalidGender = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '4.4.2000',
  gender: 'invalid'
};
exports.invalidGender = invalidGender;
var invalidPhoneNumber = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '4.4.2000',
  gender: 'male',
  phoneNumber: '8978762565652652625'
}; // Function to create users for each test

exports.invalidPhoneNumber = invalidPhoneNumber;

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

var generateToken = function generateToken() {
  var token = _jsonwebtoken["default"].sign({
    _id: _id
  }, process.env.JWT_KEY, {
    expiresIn: '1h'
  });

  return token;
};

exports.generateToken = generateToken;
var invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY5Y2NmODM3MDFhODUwOGM2NzZhZGYiLCJpYXQiOjE1NzY2NTg1NTcsImV4cCI6MTU3NjY2MjE1N30.Wz6xtyN9B6gXr_Y2VgbWUVOZrAljoy4V2ewhZrWXSUB';
exports.invalidToken = invalidToken;
//# sourceMappingURL=testData.js.map