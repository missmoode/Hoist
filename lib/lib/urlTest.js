"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInstance;

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isInstance(address) {
  return new Promise(function (resolve, reject) {
    _request.default.get("http://".concat(address, "/api/v1/instance/")).on('response', function (response) {
      resolve(response.statusCode === 200);
    }).on('error', function (err) {
      reject(err);
    });
  });
}