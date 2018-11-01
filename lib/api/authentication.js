"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _clientProvider = _interopRequireDefault(require("../lib/clientProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // Return client ID (register app if we dont have one)


router.get("/:instance", function (req, res) {
  getInstance(decodeURIComponent(req.params['instance']).toLowerCase()).then(function (instance) {
    res.status(200).json(instance);
  }).catch(function (err) {
    res.status(500).json({
      error: 'Internal Server Error: ' + err
    });
  });
});
var _default = router;
exports.default = _default;