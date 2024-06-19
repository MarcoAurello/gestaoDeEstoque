"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);



var _perfilmodel = require('./perfil.model'); var _perfilmodel2 = _interopRequireDefault(_perfilmodel);



class Usuario extends _sequelize.Model {
     generateToken() {
        return _jsonwebtoken2.default.sign({ id: this.id }, "c43e4311194ab5795eaf4db533b8172d");
      }
    
}

Usuario.init({
    id: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },

    cpf: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },

    passwordHash: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },
    chapa: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },

    fkPerfil: {
        type: _sequelize.DataTypes.UUID,
        allowNull: false
      },

      ativo: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },

    primeiroLogin: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },

    validado: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },

    fkValidador: {
        type: _sequelize.DataTypes.UUID,
        allowNull: true
      },




}, {
    sequelize: _connection2.default,
    tableName: "usuario",
    hooks: {
        async beforeValidate(instance) {
            instance.id = _uuidv4.uuid.call(void 0, )
        }
    }
})


Usuario.belongsTo(_perfilmodel2.default, { foreignKey: "fkPerfil" })
_perfilmodel2.default.hasMany(Usuario, { foreignKey: 'fkPerfil' })

Usuario.belongsTo(Usuario, { foreignKey: 'fkValidador', as: 'Validador' }); // Definindo um alias para a associação
Usuario.hasMany(Usuario, { foreignKey: 'fkValidador', as: 'UsuariosValidados' }); // Definindo um alias para a associação inversa



exports. default = Usuario 