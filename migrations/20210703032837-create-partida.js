'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Partidas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ganador: {
        type: Sequelize.INTEGER
      },
      IdRonda:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Rondas',
          key:'id'
        }
      },
      IdEquipo1:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Equipos',
          key:'id'
        }
      },
      IdEquipo2:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Equipos',
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
    await queryInterface.dropTable('Partidas');
  }
};