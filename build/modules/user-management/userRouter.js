"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("./userController"));

var _auth = _interopRequireDefault(require("../../middleware/auth"));

var _multer = require("../../middleware/multer");

var _cloudinary = require("../../config/cloudinary");

var createUser = _userController["default"].createUser,
    loginUser = _userController["default"].loginUser,
    viewUserProfile = _userController["default"].viewUserProfile,
    createUserProfile = _userController["default"].createUserProfile,
    uploadAvatar = _userController["default"].uploadAvatar;
var userRouter = (0, _express.Router)();
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', _auth["default"], viewUserProfile);
userRouter.patch('/me', _auth["default"], createUserProfile);
userRouter.patch('/me/avatar', _auth["default"], _multer.multerUploads, _cloudinary.cloudinaryConfig, uploadAvatar);
var _default = userRouter;
exports["default"] = _default;
//# sourceMappingURL=userRouter.js.map