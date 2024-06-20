import { Model, DataTypes } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'

class Perfil extends Model { }

Perfil.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
   
  },

}, {
  sequelize: connection,
  tableName: 'perfil',
  hooks: {
    async beforeValidate(instance) {
      instance.id = uuid()
    }
  }
})

export default Perfil
