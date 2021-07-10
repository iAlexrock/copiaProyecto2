'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Torneos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fecha_ini: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      maxParticipantes: {
        type: Sequelize.INTEGER
      },
      numParticipantes:{
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      partidasxDia: {
        type: Sequelize.INTEGER
      },
      puntajeGanar: {
        type: Sequelize.INTEGER
      },
      puntajePerder: {
        type: Sequelize.INTEGER
      },
      puntajeEmpatar: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      },
      numRondas: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Torneos');
  }
};