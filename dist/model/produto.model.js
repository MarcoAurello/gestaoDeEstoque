"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);



class Produto extends _sequelize.Model { }

Produto.init({
    id: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    validade: {
        type: _sequelize.DataTypes.DATE,
        allowNull: false
    },
    qtdEstoque: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false
    },




}, {
    sequelize: _connection2.default,
    tableName: "produto",
    hooks: {
        async beforeValidate(instance) {
            instance.id = _uuidv4.uuid.call(void 0, )
        }
    }
})



exports. default = Produto 