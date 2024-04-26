'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pedido', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },

      dataRetirada: {
        type: Sequelize.DATE,
        allowNull: true
      },
      quantidadeRetirada: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entregePor: {
        type: Sequelize.STRING,
        allowNull: true
      },

      fkSolicitante: {
        type: Sequelize.UUID,
        allowNull: true
      },

      fkLocal: {
        type: Sequelize.UUID,
        allowNull: true
      },

      fkProduto: {
        type: Sequelize.UUID,
        allowNull: true
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('pedido')
  }
}