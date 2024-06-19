"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _usuariomodel = require('./usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _banheiromodel = require('./banheiro.model'); var _banheiromodel2 = _interopRequireDefault(_banheiromodel);

class LimpezaBanheiro extends _sequelize.Model { }

LimpezaBanheiro.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  avaliado: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: true
  },

  observacao: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },

  caminho: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },



  fkUsuario: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  fkLocal: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  }

}, {
  sequelize: _connection2.default,
  tableName: "limpezaBanheiro",
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})


LimpezaBanheiro.belongsTo(_usuariomodel2.default, { foreignKey: "fkUsuario" })
_usuariomodel2.default.hasMany(LimpezaBanheiro, { foreignKey: 'fkUsuario' })

LimpezaBanheiro.belongsTo(_banheiromodel2.default, { foreignKey: "fkLocal" })
_banheiromodel2.default.hasMany(LimpezaBanheiro, { foreignKey: 'fkLocal' })




exports. default = LimpezaBanheiro 