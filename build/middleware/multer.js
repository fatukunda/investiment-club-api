"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataUri = exports.multerUploads = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _datauri = _interopRequireDefault(require("datauri"));

var _path = _interopRequireDefault(require("path"));

var storage = _multer["default"].memoryStorage();

var multerUploads = (0, _multer["default"])({
  storage: storage
}).single('image');
exports.multerUploads = multerUploads;
var dUri = new _datauri["default"](); // eslint-disable-next-line max-len

var dataUri = function dataUri(req) {
  return dUri.format(_path["default"].extname(req.file.originalname).toString(), req.file.buffer);
};

exports.dataUri = dataUri;
//# sourceMappingURL=multer.js.map