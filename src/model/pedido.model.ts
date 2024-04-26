import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"

import Produto from "./produto.model"
import Local from "./local.model"
import Solicitante from "./usuario.model"



class Pedido extends Model {
    public id!: string
    public dataRetirada!: Date
    public quantidadeRetirada!: Number
    public status!: string
    public entregePor!: string

    public fkSolicitante!: string
    public fkLocal!: string
    public fkProduto!: string

    public Produto!: Produto
    public Local!: Local
    public Solicitante!: Solicitante
    
   

    public createdAt!: Date
    public updatedAt!: Date
}

Pedido.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    dataRetirada: {
        type: DataTypes.DATE,
        allowNull: true
    },

    quantidadeRetirada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    entregePor: {
        type: DataTypes.TEXT,
        allowNull: true
    },


    

    fkSolicitante: {
        type: DataTypes.UUID,
        allowNull: false
      },

      fkLocal: {
        type: DataTypes.UUID,
        allowNull: false
      },

      fkProduto: {
        type: DataTypes.UUID,
        allowNull: false
      },


    

}, {
    sequelize: connection,
    tableName: "pedido",
    hooks: {
        async beforeValidate(instance) {
            instance.id = uuid()
        }
    }
})

Pedido.belongsTo(Solicitante, { foreignKey: "fkSolicitante" })
Solicitante.hasMany(Pedido, { foreignKey: 'fkSolicitante' })

Pedido.belongsTo(Local, { foreignKey: "fkLocal" })
Local.hasMany(Pedido, { foreignKey: 'fkLocal' })

Pedido.belongsTo(Produto, { foreignKey: "fkProduto" })
Produto.hasMany(Pedido, { foreignKey: 'fkProduto' })




export default Pedido 