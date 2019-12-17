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
});
//# sourceMappingURL=userModule.test.js.map