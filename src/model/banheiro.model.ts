import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"

import Local from "./local.model"

class Banheiro extends Model { }

Banheiro.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },


  fkLocal: {
    type: DataTypes.UUID,
    allowNull: false
  }

}, {
  sequelize: connection,
  tableName: "banheiro",
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})


Banheiro.belongsTo(Local, { foreignKey: "fkLocal" })
Local.hasMany(Banheiro, { foreignKey: 'fkLocal' })



export default Banheiro 