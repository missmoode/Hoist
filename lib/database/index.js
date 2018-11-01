"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = _interopRequireDefault(require("./models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function Database(host, database, username, password) {
  _classCallCheck(this, Database);

  var sequelize = new _sequelize.default(database, username, password, {
    host: host,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  console.log('Testing connection to database...');
  sequelize.authenticate().then(function () {
    console.log('Connection to database has been established');
  }).catch(function (err) {
    console.error("Unable to connect to the database:", err);
  });

  for (var model in _models.default) {
    this[model] = sequelize.define(model.toLowerCase(), _models.default[model]);
  }
};

exports.default = Database;