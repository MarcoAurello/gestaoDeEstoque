"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _unidademodel = require('./unidade.model'); var _unidademodel2 = _interopRequireDefault(_unidademodel);

class Local extends _sequelize.Model { }

Local.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },


  fkUnidade: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  }

}, {
  sequelize: _connection2.default,
  tableName: "local",
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})
Local.belongsTo(_unidademodel2.default, { foreignKey: "fkUnidade" })
_unidademodel2.default.hasMany(Local, { foreignKey: 'fkUnidade' })



exports. default = Local 