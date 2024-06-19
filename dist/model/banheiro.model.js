"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _localmodel = require('./local.model'); var _localmodel2 = _interopRequireDefault(_localmodel);

class Banheiro extends _sequelize.Model { }

Banheiro.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  codigo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },

  descricao: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },


  fkLocal: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  }

}, {
  sequelize: _connection2.default,
  tableName: "banheiro",
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})


Banheiro.belongsTo(_localmodel2.default, { foreignKey: "fkLocal" })
_localmodel2.default.hasMany(Banheiro, { foreignKey: 'fkLocal' })



exports. default = Banheiro 