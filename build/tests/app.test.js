"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _app = _interopRequireDefault(require("../app"));

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the landig page endpoint', function () {
  it('should print welcome to investiment club portal', function (done) {
    _chai["default"].request(_app["default"]).get('/').send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Welcome to the Investiment club portal');
      done();
    });
  });
});
//# sourceMappingURL=app.test.js.map