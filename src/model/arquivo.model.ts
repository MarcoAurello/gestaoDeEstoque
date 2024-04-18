import { Model, DataTypes } from 'sequelize'
import connection from './connection'

import { uuid } from 'uuidv4'
import LimpezaBanheiro from "./limpezaBanheiro.model"

class Arquivo extends Model {
  public id!: string
  public nome!: string
  public nomeApresentacao!: string
  public caminho!: string
  public fkLimpezaBanheiro!: string
  public LimpezaBanheiro!: LimpezaBanheiro
  public createdAt!: Date
  public updatedAt!: Date
}

Arquivo.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomeApresentacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caminho: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fkLimpezaBanheiro: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  sequelize: connection,
  tableName: 'arquivo',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

Arquivo.belongsTo(LimpezaBanheiro, { foreignKey: "fkLimpezaBanheiro" })
LimpezaBanheiro.hasMany(Arquivo, { foreignKey: 'fkLimpezaBanheiro' })


export default Arquivo