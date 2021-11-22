'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Partida', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      juego: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      hora: {
        type: Sequelize.DATE
      },
      duracion: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      equipoA: {
        type: Sequelize.STRING
      },
      equipoB: {
        type: Sequelize.STRING
      },
      factorA: {
        type: Sequelize.FLOAT
      },
      factorB: {
        type: Sequelize.FLOAT
      },
      factorEmpate: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Partida');
  }
};