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
    await queryInterface.bulkInsert('produto', 
    [
      {
        id: uuid(),
        nome: 'ALCOOL PULVERIZADOR 500 ML - FRACIONADO',
        descricao: 'Álcool A 70%',
        validade: new Date(),
        qtdEstoque: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Álcool Gel-Fracionado',
        descricao: 'Álcool Gel 5 Litros',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Álcool Refil 800ml',
        descricao: 'Álcool Refil 800ml',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Álcool 70%GLC/1000 ML',
        descricao: 'Álcool 70%GLC/1000 ML',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'BUCHA PARA POLIMENTO PUNHADO',
        descricao: 'Bucha para Polimento Malha Branca C/1Kg',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'CERA LIQUIDA 2.5 LITROS - FRACIONADO',
        descricao: 'Cera Líquida Incolor para Piso',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Cloro Líquido a Granel com 5 Litros',
        descricao: 'Cloro Líquido a Granel com 5 Litros',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Desentupidor para Pia',
        descricao: 'Desentupidor para Pia',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Desentupidor para Sanitário',
        descricao: 'Desentupidor para Sanitário',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DESINFETANTE CONCENTRADO- 1 BOMBONA - DILUIDO',
        descricao: 'Desinfetante Concentrado para Uso Profissional',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Desinfetante Tripla Ação C/700ml Removic',
        descricao: 'Desinfetante Tripla Ação C/700ml Removic',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Detergente Alcalino P/Limpeza Pesada C/5Litros',
        descricao: 'Detergente Alcalino P/Limpeza Pesada C/5Litros',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DETERGENTE ALCALINO CLORADO 5 LITROS ',
        descricao: 'Detergente Alcalino Clorado',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Detergente Liquido Neutro',
        descricao: 'Detergente Liquido Neutro',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DETERGENTE MULTIUSO PULVERIZADOR 500 ML - FRACIONADO',
        descricao: 'Detergente Multiuso',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DETERGENTE NEUTRO 500 ML - FRACIONADO',
        descricao: 'Detergente Neutro Concentrado',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DETERGENTE DESENGRAXANTE E DESENGORDURANTE LÍQUIDO 5 LITROS ',
        descricao: 'Detergente Desengraxante e Desengordurante',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Escova de Mão',
        descricao: 'Escova de Mão',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Escova Sanitaria',
        descricao: 'Escova Sanitaria',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Esponja Dupla Face',
        descricao: 'Esponja Dupla Face',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Fibra Verde Leve',
        descricao: 'Fibra Verde Leve',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Fibra Verde Pesada',
        descricao: 'Fibra Verde Pesada',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Flanela 40 X60',
        descricao: 'Flanela 40 X60',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Inseticida Aerosol C/300 Ml',
        descricao: 'Inseticida Aerosol C/300 Ml',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Lubrificante Antiferrugem',
        descricao: 'Lubrificante Antiferrugem',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Lustra Móveis C/ 200 Ml',
        descricao: 'Lustra Móveis C/ 200 Ml',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Luva de Malha Tricotada 4 Fios',
        descricao: 'Luva de Malha Tricotada 4 Fios',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Luva Ranhurada Tam EG',
        descricao: 'Luva Ranhurada Tam EG',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Luva Ranhurada Tam G',
        descricao: 'Luva Ranhurada Tam G',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Luva Ranhurada Tam M',
        descricao: 'Luva Ranhurada Tam M',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Máscara Descartavel Pó',
        descricao: 'Máscara Descartavel Pó',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'NEUTRALIZADOR DE ODORES CONCENTRADO 250 ML - FRACIONADO',
        descricao: 'Neutralizador de Odores Concentrado C/700 Ml',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'ODORIZANTE LÍQUIDO USO PROFISSIONAL 500 ML - FRACIONADO',
        descricao: 'Odorizante Líquido Uso Profissional C/ 5 Litros',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'ÓLEO MINERAL 250 ML - FRACIONADO',
        descricao: 'Óleo Mineral',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Pá P/ Lixo com Cabo Longo',
        descricao: 'Pá P/ Lixo com Cabo Longo',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Papel Higiênico - 250 M',
        descricao: 'Papel Higiênico - 250 M',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Papel Toalha - Bobina 20cm X 200m',
        descricao: 'Papel Toalha - Bobina 20cm X 200m',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Pasta de Limpeza a Seco',
        descricao: 'Pasta de Limpeza a Seco',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Placa Perfumada P/ Miquitório',
        descricao: 'Placa Perfumada P/ Miquitório',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Pulverizador',
        descricao: 'Pulverizador',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Refil Mop Água Ponta Dobrada',
        descricao: 'Refil Mop Água Ponta Dobrada',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'REMOVEDOR DE CERA DE PISO 2.5 LITROS - FRACIONADO',
        descricao: 'Removedor de Cera de Piso',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Removedor de Sujeidade Orgânica - AC10',
        descricao: 'Removedor de Sujeidade Orgânica - AC10',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Rodo C/40cm Borracha Dupla',
        descricao: 'Rodo C/40cm Borracha Dupla',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Sabão Amarelo com 200g',
        descricao: 'Sabão Amarelo com 200g',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Sabão de Coco C/ 100 Gramas',
        descricao: 'Sabão de Coco C/ 100 Gramas',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Sabão em Pasta C/200 Gramas',
        descricao: 'Sabão em Pasta C/200 Gramas',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Sabonete Líquido Espuma - Refil 700ml',
        descricao: 'Sabonete Líquido Espuma - Refil 700ml',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Saco para Chão',
        descricao: 'Saco para Chão',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Saco para Lixo 200 Litros',
        descricao: 'Saco para Lixo 200 Litros',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Saco para Lixo de 60 Litros',
        descricao: 'Saco para Lixo de 60 Litros',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Spray Limpador e Polidor de Aço com 170 Gramas',
        descricao: 'Spray Limpador e Polidor de Aço com 170 Gramas',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Vassoura de Pelo Sintético Modelo Tipo Leque',
        descricao: 'Vassoura de Pelo Sintético Modelo Tipo Leque',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Vassoura Sanitária',
        descricao: 'Vassoura Sanitária',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Desinfetante Eliminador de Odores para Animais - 2 Litros',
        descricao: 'Desinfetante Eliminador de Odores para Animais - 2 Litros',
        validade: new Date(),
        qtdEstoque: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    
    , {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('produto', null, {})
  }
}
