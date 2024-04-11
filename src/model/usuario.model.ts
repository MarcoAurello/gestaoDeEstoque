import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"
import jwt from "jsonwebtoken";


import Validador from "./usuario.model"
import Perfil from "./perfil.model"



class Usuario extends Model {
    public id!: string
    public nome!: string
    public email!: string
    public passwordHash!: string
    public chapa!: string
    public password!: string
    public fkPerfil!: string
    public ativo!: Boolean
    public primeiroLogin!: Boolean
   
   
    public validado!: Boolean
   
   
    public fkValidador!: string

    public Validador!: Validador
    public Perfil!: Perfil
   

    public createdAt!: Date
    public updatedAt!: Date

    public generateToken() {
        return jwt.sign({ id: this.id }, "c43e4311194ab5795eaf4db533b8172d");
      }
    
}

Usuario.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    chapa: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    fkPerfil: {
        type: DataTypes.UUID,
        allowNull: false
      },

      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    primeiroLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    validado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    fkValidador: {
        type: DataTypes.UUID,
        allowNull: true
      },


 
   




}, {
    sequelize: connection,
    tableName: "usuario",
    hooks: {
        async beforeValidate(instance) {
            instance.id = uuid()
        }
    }
})


Usuario.belongsTo(Perfil, { foreignKey: "fkPerfil" })
Perfil.hasMany(Usuario, { foreignKey: 'fkPerfil' })

Usuario.belongsTo(Usuario, { foreignKey: 'fkValidador', as: 'Validador' }); // Definindo um alias para a associação
Usuario.hasMany(Usuario, { foreignKey: 'fkValidador', as: 'UsuariosValidados' }); // Definindo um alias para a associação inversa



export default Usuario 