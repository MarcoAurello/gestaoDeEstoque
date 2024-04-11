'use strict'
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

    const entrada = await queryInterface.sequelize.query('select * from produto where nome = \'Desinfetante Eliminador de Odores para Animais - 2 Litros\'')
    const usuario = await queryInterface.sequelize.query('select * from usuario where nome = \'a\'')
   


    await queryInterface.bulkInsert('entrada', [
      { id: uuid(), 
        data: new Date(),
        fkProduto: entrada[0][0].id,
        quantidade:3,
        fkUsuario: usuario[0][0].id,
        

         createdAt: new Date(),
          updatedAt: new Date() },
     ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('entrada', null, {})
  }
}
