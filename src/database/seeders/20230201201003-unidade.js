'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const setores = [
      'PRÉDIO ADMINISTRATIVO',
      'UHT',
      'UIP',
      'PRÉDIO JOÃO RODRIGUES',
      'FACULDADE',
      'PRÉDIO UIS/PET',
      'SERVIÇOS EXTERNOS',
      
    ];

    const setoresData = setores.map((setor) => ({
      id: uuidv4(),
      nome: setor,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('unidade', setoresData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('unidade', null, {});
  },
};