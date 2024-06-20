"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);
var _produtomodel = require('./produto.model'); var _produtomodel2 = _interopRequireDefault(_produtomodel);




class Entrada extends _sequelize.Model { }

Entrada.init({
    id: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
   
    Data: {
        type: _sequelize.DataTypes.DATE,
        allowNull: false
    },
    quantidade: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false
    },

    fkProduto: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false
      },

      fkUsuario: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false
      }




}, {
    sequelize: _connection2.default,
    tableName: "entrada",
    hooks: {
        async beforeValidate(instance) {
            instance.id = _uuidv4.uuid.call(void 0, )
        }
    }
})

Entrada.belongsTo(_produtomodel2.default, { foreignKey: "fkProduto" })
_produtomodel2.default.hasMany(Entrada, { foreignKey: 'fkProduto' })




exports. default = Entrada 