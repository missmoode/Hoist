"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

require("pg");

var _authentication = _interopRequireDefault(require("./api/authentication.js"));

var _database = _interopRequireDefault(require("./database"));

var _urlTest = _interopRequireDefault(require("./lib/urlTest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App(port) {
  _classCallCheck(this, App);

  this.express = (0, _express.default)();
  this.express.use('/authentication', _authentication.default);
  this.express.listen(port, function () {
    console.log("App listening on port ".concat(port));
  });
  this.database = new _database.default("host", "database", "username", "password");
};

var _default = new App(80);

exports.default = _default;