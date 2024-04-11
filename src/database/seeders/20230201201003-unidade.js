'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const setores = [
      'PRESIDENCIA',
      'GSI - COORD. DE ENGENHARIA',
      'GSI - COORD. DE SERVIÇOS',
      'DEP',
      'DIOP CARRETA',
      'GSI - PATRIMONIO',
      'ASSESSORIA DA PRESIDÊNCIA',
      'ASSESSORIA JURIDICA',
      'UEP-Serra Talhada',
      'Comercial',
      'DPE-SENAC',
      'DPE-Fecomercio',
      'UEP-Caruaru',
      'CETTI',
      'CETTI - PORTO DIGITAL',
      'GSI',
      'GOI',
      'GPG',
      'Gercom',
      'DR',
      'UEP-Paulista',
      'UEP-Recife',
      'UEP-Garanhuns',
      'CAS',
      'GCF',
      'GTI',
      'CARUARU - MODERN. E REFORMA',
      'UEP-Vitoria',
      'DAF',
      'UHT',
      'UIP',
      'Faculdade',
      'UIS',
      'GLC',
      'GPC',
      'UEP-Petrolina',
      'CEP Mediotec',
      'GNC',
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