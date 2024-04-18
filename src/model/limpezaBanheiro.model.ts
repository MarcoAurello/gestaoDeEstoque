import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"

import Usuario from "./usuario.model"
import Local from "./banheiro.model"

class LimpezaBanheiro extends Model {
  public id!: string

  public avaliado!: Boolean

  public observacao!: string
  public caminho!: string
  public status!: string
  
  public fkUsuario!: string
  public fkLocal!: string
 

  public Usuario!: Usuario
  public Local!: Local
 
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
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },

  caminho: {
    type: DataTypes.STRING,
    allowNull: true
  },



  fkUsuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fkLocal: {
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

LimpezaBanheiro.belongsTo(Local, { foreignKey: "fkLocal" })
Local.hasMany(LimpezaBanheiro, { foreignKey: 'fkLocal' })




export default LimpezaBanheiro 