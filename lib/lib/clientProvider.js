"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInstance;

var _hoist = _interopRequireDefault(require("../hoist.js"));

var _urlTest = _interopRequireDefault(require("./urlTest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInstance(address) {
  return new Promise(function (resolve, reject) {
    _hoist.default.database.Instance.findOne({
      where: {
        address: address
      }
    }).then(function (instance) {
      if (instance === null) {
        // Haven't met this instance, try and say hi
        (0, _urlTest.default)(address).then(function (isInst) {
          if (!isInst) return reject("not an instance");
          request({
            url: "http://".concat(address, "/api/v1/apps"),
            method: "POST",
            json: {
              "client_name": "Sail App",
              "redirect_uris": ["hoist.getsail.app/redirect"],
              "scopes": "write read follow push",
              "website": "http://getsail.app"
            }
          }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var _response = JSON.parse(body);

              console.log(_response);

              var _instance = _hoist.default.database.Instance.build({
                address: address,
                clientID: _response['client_id'],
                clientSecret: _response['client_secret']
              });

              _instance.save().then(function () {
                return resolve(_instance);
              }).catch(function (err) {
                return reject(err);
              });
            } else {
              return reject(error);
            }
          });
        }).catch(function (error) {
          return reject(error);
        });
      } else {
        resolve(instance);
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}