"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClientID;

var _hoist = _interopRequireDefault(require("../hoist.js"));

var _urlTest = _interopRequireDefault(require("./urlTest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getClientID(address) {
  return new Promise(function (resolve, reject) {
    (0, _urlTest.default)(address).then(function (isInst) {
      if (!isInst) return reject("not an instance");
      resolve('its');
    }).catch(function (error) {
      return reject(error);
    });
  });
}