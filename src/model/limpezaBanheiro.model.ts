import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"

import Usuario from "./usuario.model"

class LimpezaBanheiro extends Model {
  public id!: string

  public avaliado!: Boolean

  public observacao!: string
  public caminho!: string
  
  public fkUsuario!: string
 

  public Usuario!: Usuario
 
  public createdAt!: Date
  public updatedAt!: Date
}

LimpezaBanheiro.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  avaliado: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },

  observacao: {
    type: DataTypes.STRING,
    allowNull: true
  },

  caminho: {
    type: DataTypes.STRING,
    allowNull: false
  },



  fkUsuario: {
    type: DataTypes.UUID,
    allowNull: false
  }

}, {
  sequelize: connection,
  tableName: "limpezaBanheiro",
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})


LimpezaBanheiro.belongsTo(Usuario, { foreignKey: "fkUsuario" })
Usuario.hasMany(LimpezaBanheiro, { foreignKey: 'fkUsuario' })



export default LimpezaBanheiro 