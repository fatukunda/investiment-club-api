"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _userRouter = _interopRequireDefault(require("./modules/user-management/userRouter"));

_dotenv["default"].config();

require('./database');

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use('/api/v1/users', _userRouter["default"]);
app.get('/', function (req, res) {
  res.send({
    message: 'Welcome to the Investiment club portal'
  });
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map