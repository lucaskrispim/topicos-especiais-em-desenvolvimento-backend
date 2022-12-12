'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Consultas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      ClienteCPF: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Clientes', key: 'CPF' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      Valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      NumPrestacoes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Juros: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      Montante: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      Prestacoes: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Consultas');
  }
};
