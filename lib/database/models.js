"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Instance = {
  address: {
    type: _sequelize.default.STRING
  },
  clientID: {
    type: _sequelize.default.STRING
  },
  clientSecret: {
    type: _sequelize.default.STRING
  }
};
var _default = {
  Instance: Instance
};
exports.default = _default;