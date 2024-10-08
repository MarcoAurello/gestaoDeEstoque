'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('limpezaBanheiro', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      avaliado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
       
      },
      observacao: {
        type: Sequelize.STRING,
        allowNull: true,
       
      },
      caminho: {
        type: Sequelize.STRING,
        allowNull: true,
       
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
       
      },
      fkUsuario: {
        type: Sequelize.UUID,
        allowNull: false
      },
      fkLocal: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('limpezaBanheiro')
  }
}
