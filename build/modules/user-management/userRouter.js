"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("./userController"));

var createUser = _userController["default"].createUser,
    loginUser = _userController["default"].loginUser;
var userRouter = (0, _express.Router)();
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
var _default = userRouter;
exports["default"] = _default;
//# sourceMappingURL=userRouter.js.map