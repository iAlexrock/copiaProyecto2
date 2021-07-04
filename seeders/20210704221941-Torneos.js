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
     await queryInterface.bulkInsert('Torneos', [
      {
       nombre: 'torneo1',
       descripcion: 'dificl lolsito',
       fecha_ini: new Date(2021,7,7),
       fecha_fin: new Date(2021,7,13),
       maxParticipantes:7,
       tipo: 'muertos',
       partidasxDia: 4,
       IdOrganizador:4,
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
