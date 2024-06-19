"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _uuidv4 = require('uuidv4');
var _limpezaBanheiromodel = require('./limpezaBanheiro.model'); var _limpezaBanheiromodel2 = _interopRequireDefault(_limpezaBanheiromodel);

class Arquivo extends _sequelize.Model { }

Arquivo.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
  },
  nomeApresentacao: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
  },
  caminho: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
  },
  fkLimpezaBanheiro: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true,
  }
}, {
  sequelize: _connection2.default,
  tableName: 'arquivo',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

Arquivo.belongsTo(_limpezaBanheiromodel2.default, { foreignKey: "fkLimpezaBanheiro" })
_limpezaBanheiromodel2.default.hasMany(Arquivo, { foreignKey: 'fkLimpezaBanheiro' })


exports. default = Arquivo