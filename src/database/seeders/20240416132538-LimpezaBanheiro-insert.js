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

    const unidade = await queryInterface.sequelize.query('select * from usuario  where nome = \'a\'')
   


    await queryInterface.bulkInsert('limpezaBanheiro', [
      { id: uuid(), 
        avaliado:false,
        observacao:'limpreza efetuada',
        caminho:'sss',

       
        fkUsuario: unidade[0][0].id,
        
        
        

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
    await queryInterface.bulkDelete('limpezaBanheiro', null, {})
  }
}
