import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"
import Produto from "./produto.model"
import Usuario from "./usuario.model"



class Entrada extends Model {
    public id!: string
    public Data!: Date
    public quantidade!: Number

    public fkProduto!: string
    public fkUsuario!: string
 

    public Produto!: Produto
    public Usuario!: Usuario

    public createdAt!: Date
    public updatedAt!: Date
}

Entrada.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
   
    Data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fkProduto: {
        type: DataTypes.UUID,
        allowNull: false
      },

      fkUsuario: {
        type: DataTypes.UUID,
        allowNull: false
      }




}, {
    sequelize: connection,
    tableName: "entrada",
    hooks: {
        async beforeValidate(instance) {
            instance.id = uuid()
        }
    }
})

Entrada.belongsTo(Produto, { foreignKey: "fkProduto" })
Produto.hasMany(Entrada, { foreignKey: 'fkProduto' })




export default Entrada 