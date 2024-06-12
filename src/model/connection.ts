const Sequelize = require('sequelize')

require('dotenv').config({ path: process.env.DEVMODE?.trim() === 'test' ? '.env.test' : '.env' })

// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PWD, {
//   host: process.env.SERVER,
//   dialect: process.env.DIALECT,
//   logging: false
// })

const sequelize = new Sequelize('ServicosGerais', 'sa', 'local', {
  host: '10.9.8.74',
  dialect: 'mssql',
  logging: false,
  timezone: '-03:00'
})

export default sequelize
