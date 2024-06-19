"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _produtomodel = require('./produto.model'); var _produtomodel2 = _interopRequireDefault(_produtomodel);
var _localmodel = require('./local.model'); var _localmodel2 = _interopRequireDefault(_localmodel);
var _usuariomodel = require('./usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);



class Pedido extends _sequelize.Model { }

Pedido.init({
    id: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    dataRetirada: {
        type: _sequelize.DataTypes.DATE,
        allowNull: true
    },

    quantidadeRetirada: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },
    entregePor: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: true
    },


    

    fkSolicitante: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false
      },

      fkLocal: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false
      },

      fkProduto: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false
      },


    

}, {
    sequelize: _connection2.default,
    tableName: "pedido",
    hooks: {
        async beforeValidate(instance) {
            instance.id = _uuidv4.uuid.call(void 0, )
        }
    }
})

Pedido.belongsTo(_usuariomodel2.default, { foreignKey: "fkSolicitante" })
_usuariomodel2.default.hasMany(Pedido, { foreignKey: 'fkSolicitante' })

Pedido.belongsTo(_localmodel2.default, { foreignKey: "fkLocal" })
_localmodel2.default.hasMany(Pedido, { foreignKey: 'fkLocal' })

Pedido.belongsTo(_produtomodel2.default, { foreignKey: "fkProduto" })
_produtomodel2.default.hasMany(Pedido, { foreignKey: 'fkProduto' })




exports. default = Pedido 