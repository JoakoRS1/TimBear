'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Categoria', [
      {
        nombre : "Eliminatorias Qatar",
        createdAt : new Date(), 
        updatedAt : new Date()},
      {
        nombre : "Copa Libertadores",
        createdAt : new Date(), 
        updatedAt : new Date(),},
      {
        nombre : "NBA",
        createdAt : new Date(), 
        updatedAt : new Date()},
    ])

    await queryInterface.bulkInsert('Juego', [
      {
        nombre : "Futbol",
        categoria : "Copa Libertadores",
        categoriaId: "2",
        createdAt : new Date(), 
        updatedAt : new Date()
      },
      {
        nombre : "Futbol",
        categoria : "Eliminatorias Qatar",
        categoriaId: "1",
        createdAt : new Date(), 
        updatedAt : new Date()},
      {
        nombre : "Basketball",
        categoria : "NBA",
        categoriaId: "2",
        createdAt : new Date(), 
        updatedAt : new Date()},
     
    ])








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
