'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EquipoTorneos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      puntaje: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      },
      IdEquipo:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Equipos',
          key:'id'
        }
      },
      IdTorneo:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Torneos',
          key:'id'
        }
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
    await queryInterface.dropTable('EquipoTorneos');
  }
};