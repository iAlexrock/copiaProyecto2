'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Equipos', [
      {
       nombre: 'g3',
       integrantes: 7,
       createdAt: new Date(),
       updatedAt : new Date()
     },
     {
      nombre: 'g4',
      integrantes: 7,
      createdAt: new Date(),
      updatedAt : new Date()
    }],{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
