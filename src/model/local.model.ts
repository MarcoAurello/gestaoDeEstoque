import { Model, DataTypes } from "sequelize"
import { uuid } from "uuidv4"
import connection from "./connection"

import Unidade from "./unidade.model"

class Local extends Model { }

Local.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },


  fkUnidade: {
    type: DataTypes.UUID,
    allowNull: false
  }

}, {
  sequelize: connection,
  tableName: "local",
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})
Local.belongsTo(Unidade, { foreignKey: "fkUnidade" })
Unidade.hasMany(Local, { foreignKey: 'fkUnidade' })



export default Local 