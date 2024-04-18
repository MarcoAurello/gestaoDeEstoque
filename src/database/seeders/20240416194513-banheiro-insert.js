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

    const solicitante = await queryInterface.sequelize.query('select * from usuario  where nome = \'a\'')
    const local = await queryInterface.sequelize.query('select * from local  where nome = \'2 andar faculdade\'')
    const produto = await queryInterface.sequelize.query('select * from produto  where nome = \'Desinfetante Eliminador de Odores para Animais - 2 Litros\'')
   


    await queryInterface.bulkInsert('banheiro', [
      { id: uuid(), 
        codigo :'123',
        descricao:'111',

        fkLocal:  local[0][0].id,
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
    await queryInterface.bulkDelete('banheiro', null, {})
  }
}
