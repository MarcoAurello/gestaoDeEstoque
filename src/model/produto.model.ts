import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"



class Produto extends Model { }

Produto.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validade: {
        type: DataTypes.DATE,
        allowNull: false
    },
    qtdEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },




}, {
    sequelize: connection,
    tableName: "produto",
    hooks: {
        async beforeValidate(instance) {
            instance.id = uuid()
        }
    }
})



export default Produto 