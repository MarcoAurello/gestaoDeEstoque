'use strict'
const { uuid } = require('uuidv4')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const adm = await queryInterface.sequelize.query('select * from unidade  where nome = \'PRÉDIO ADMINISTRATIVO\'')
    const uht = await queryInterface.sequelize.query('select * from unidade  where nome = \'UHT\'')
    const uip = await queryInterface.sequelize.query('select * from unidade  where nome = \'UIP\'')
    const rod = await queryInterface.sequelize.query('select * from unidade  where nome = \'PRÉDIO JOÃO RODRIGUES\'')
    const fac = await queryInterface.sequelize.query('select * from unidade  where nome = \'FACULDADE\'')
    const pet = await queryInterface.sequelize.query('select * from unidade  where nome = \'PRÉDIO UIS/PET\'')
    const ex = await queryInterface.sequelize.query('select * from unidade  where nome = \'SERVIÇOS EXTERNOS\'')



    await queryInterface.bulkInsert('local', [

      {
        id: uuid(),

        fkUnidade: ex[0][0].id,
        nome: 'EVENTOS EXTERNOS',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: pet[0][0].id,
        nome: '1º ANDAR - IDIOMAS',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: pet[0][0].id,
        nome: 'TÉRREO - IDIOMAS',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: pet[0][0].id,
        nome: 'TÉRREO - PET',

        createdAt: new Date(),
        updatedAt: new Date()
      },




      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '22º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '21º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '20º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '19º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '18º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '17º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '16º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '15º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '14º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '13º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '12º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '11º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '10º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '9º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '8º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '7º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '6º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '5º ANDAR - GSI PATRIMÔNIO',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '4º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '3º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '2º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: '1º ANDAR - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: fac[0][0].id,
        nome: 'TÉRREO - FACULDADE',

        createdAt: new Date(),
        updatedAt: new Date()
      },





      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: '7º ANDAR - UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: '6º ANDAR - UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: '5º ANDAR - UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: '4º ANDAR - UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: '3º ANDAR - UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: '2º ANDAR - UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: '1º ANDAR - UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: 'TÉRREO - CAS',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: rod[0][0].id,
        nome: 'PORTARIA UEP RECIFE - GSI',

        createdAt: new Date(),
        updatedAt: new Date()
      },



















      
      {
        id: uuid(),

        fkUnidade: uip[0][0].id,
        nome: '1º ANDAR-UIP',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: uip[0][0].id,
        nome: 'TÉRREO-UIP',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      
      
      
      
      
      
      
      
      
      
      
      
      {
        id: uuid(),

        fkUnidade: uht[0][0].id,
        nome: '3º ANDAR - CEPGT',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: uht[0][0].id,
        nome: '2º ANDAR - CEPGT',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: uht[0][0].id,
        nome: '1º ANDAR - CEPGT',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: uht[0][0].id,
        nome: 'TÉRREO - CEPGT',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: uht[0][0].id,
        nome: 'ALMOXARIFADO A&B - GLC',

        createdAt: new Date(),
        updatedAt: new Date()
      },










      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: '6º ANDAR - DAF - DIRETORIA',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: '5º ANDAR  - GERÊNCIA GSI',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: '4º ANDAR - GCF',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: '3º  ANDAR - GLC GERÊNCIA',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: '2º ANDAR - GLC COMPRAS',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: '1º ANDAR - GTI',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'P3 - SALÃO DE EVENTOS GERCOM',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'P2 - MEZANINO',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'P2 - SALA DE REUNIÃO - LICITAÇÃO',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'P2 - SALA DE AULA UEP RECIFE',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'P1 - AUDITÓRIO - GERCOM',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'PORTARIA ADM - GSI',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'SUBSOLO - ALMOXARIFADO SEDE',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'GSI - MANUTENÇÃO',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'GSI - SERVIÇOS',

        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),

        fkUnidade: adm[0][0].id,
        nome: 'GSI - ÁREA EXTERNA',

        createdAt: new Date(),
        updatedAt: new Date()
      },











    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('local', null, {})
  }
}
