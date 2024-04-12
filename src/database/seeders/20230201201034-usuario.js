
'use strict'

const bcrypt = require('bcrypt')
const { uuid } = require('uuidv4')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // const perfilsAdministrador = await queryInterface.sequelize.query('select * from perfil where nome = \'Administrador\'')
    // const perfilAdministradorRows = perfilsAdministrador[0]

    const perfilsGerente = await queryInterface.sequelize.query('select * from perfil where nome = \'Administrador\'')
    const perfilGerenteRows = perfilsGerente[0]

    const areas = await queryInterface.sequelize.query('select * from area where nome = \'Sistemas - Desenvolvimento\'')
    let pass= '12345678'

    await queryInterface.bulkInsert('usuario', [
      {
        id: uuid(),
        nome: 'a',
        cpf: 'a@pe.senac.br',
        password: pass,
        passwordHash: await bcrypt.hash(pass, 8),
        validado: false,
        ativo: true,
        password:'2023',
       
        primeiroLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'b',
        cpf: 'b@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
       
        chapa: '15385-F1',
        password: pass,
        passwordHash: await bcrypt.hash(pass, 8),
        
        fkPerfil: perfilGerenteRows[0].id,
      
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('usuario', null, {})
  }
}
