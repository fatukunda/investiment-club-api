"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var port = process.env.PORT || 3000;

_app["default"].listen(port, function () {
  console.log("Server running on port ".concat(port));
});
//# sourceMappingURL=index.js.map