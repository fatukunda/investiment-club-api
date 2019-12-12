"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var env = process.env.NODE_ENV;

if (env === 'development') {
  _mongoose["default"].connect(process.env.MONGODB_URL_DEV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
} else if (env === 'testing') {
  _mongoose["default"].connect(process.env.MONGODB_URL_TEST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
} else {
  _mongoose["default"].connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
}
//# sourceMappingURL=index.js.map