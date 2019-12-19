"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _mocha = require("mocha");

var _app = _interopRequireDefault(require("../app"));

var _testData = require("./testData");

/* eslint-disable no-undef */
var usersUrl = '/api/v1/users';
var token = (0, _testData.generateToken)();

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
(0, _mocha.beforeEach)(_testData.createUsers);
describe('Testing the User management module', function () {
  it('Should create a new user', function (done) {
    var username = _testData.validUser.username,
        email = _testData.validUser.email;

    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.validUser).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data.user).to.include({
        username: username,
        email: email
      });
      done();
    });
  });
  it('Should throw a 400 if a username already exists', function (done) {
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.user1).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('Should throw a 400 if email is not provided', function (done) {
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.noEmailUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Email is required.');
      done();
    });
  });
  it('Should throw a 400 if password is not provided', function (done) {
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.noPasswordUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Password is required.');
      done();
    });
  });
  it('Should throw a 400 if username is not provided', function (done) {
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.noUsernameUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Username is required.');
      done();
    });
  });
  it('Should throw a 400 if email is not valid', function (done) {
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.invalidEmailUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("".concat(_testData.invalidEmailUser.email, " is not a valid email."));
      done();
    });
  });
  it('Should throw a 400 if password is too short', function (done) {
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.shortPasswordUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Password should have more than 6 characters.');
      done();
    });
  });
  it('Should login a user', function (done) {
    var username = _testData.user1.username,
        password = _testData.user1.password,
        email = _testData.user1.email;
    var loginInfo = {
      username: username,
      password: password
    };

    _chai["default"].request(_app["default"]).post("".concat(usersUrl, "/login")).set('Accept', 'application/json').send(loginInfo).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.user).to.include({
        username: username,
        email: email
      });
      done();
    });
  });
  it('Should throw a 400 if invalid username is provided', function (done) {
    var password = _testData.user1.password;
    var loginInfo = {
      username: 'nouser',
      password: password
    };

    _chai["default"].request(_app["default"]).post("".concat(usersUrl, "/login")).set('Accept', 'application/json').send(loginInfo).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: 'Invalid login credentials.'
      });
      done();
    });
  });
  it('Should throw a 400 if invalid password is provided', function (done) {
    var username = _testData.user1.username;
    var loginInfo = {
      username: username,
      password: 'wrongPass12'
    };

    _chai["default"].request(_app["default"]).post("".concat(usersUrl, "/login")).set('Accept', 'application/json').send(loginInfo).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: 'Invalid login credentials.'
      });
      done();
    });
  });
  it('Should view user profile', function (done) {
    var username = _testData.user1.username,
        email = _testData.user1.email;

    _chai["default"].request(_app["default"]).get("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.include({
        username: username,
        email: email
      });
      done();
    });
  });
  it('Should throw a 401 if authorization header is not given', function (done) {
    _chai["default"].request(_app["default"]).get("".concat(usersUrl, "/me")).send().end(function (err, res) {
      expect(res.status).to.equal(401);
      expect(res.body).to.include({
        status: 'error',
        message: 'Authorization header is required.'
      });
      done();
    });
  });
  it('Should throw a 401 if an invalid token was provided', function (done) {
    _chai["default"].request(_app["default"]).get("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(_testData.invalidToken)).send().end(function (err, res) {
      expect(res.status).to.equal(401);
      expect(res.body).to.include({
        status: 'error',
        message: 'Authentication failed.'
      });
      done();
    });
  });
  it('Should update user profile', function (done) {
    var firstName = _testData.userProfileData.firstName,
        lastName = _testData.userProfileData.lastName;

    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send(_testData.userProfileData).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.include({
        firstName: firstName,
        lastName: lastName
      });
      done();
    });
  });
  it('Should throw a 400 if an invalid update field is provided', function (done) {
    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidProfileData).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: 'One of the fields is not a valid update field.'
      });
      done();
    });
  });
  it('Should throw a 400 if firstName is not a string', function (done) {
    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidFirstName).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: 'firstName should contain only letters.'
      });
      done();
    });
  });
  it('Should throw a 400 if lastName is not a string', function (done) {
    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidLastName).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: 'lastName should contain only letters.'
      });
      done();
    });
  });
  it('Should throw a 400 if dob is not valid', function (done) {
    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidDob).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: 'Invalid date format.'
      });
      done();
    });
  });
  it('Should throw a 400 if gender is not valid', function (done) {
    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidGender).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: '`invalid` is not a valid enum value for path `gender`.'
      });
      done();
    });
  });
  it('Should throw a 400 if phoneNumber is not valid', function (done) {
    var phoneNumber = _testData.invalidPhoneNumber.phoneNumber;

    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidPhoneNumber).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        status: 'error',
        message: "".concat(phoneNumber, " is not a valid phone number.")
      });
      done();
    });
  });
});
//# sourceMappingURL=userModule.test.js.map