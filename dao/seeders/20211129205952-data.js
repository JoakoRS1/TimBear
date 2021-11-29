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
        categoriaId: "3",
        createdAt : new Date(), 
        updatedAt : new Date()},
    ])

    await queryInterface.bulkInsert('Partida', [
      {
        fecha : "2021-11-08 00:00:00+00",
        hora : "13:39:00",
        duracion: "3",
        estado : "Pendiente", 
        equipoA : "Joselitos",
        equipoB : "Joselitas2",
        factorA : "1",
        factorB : "1.02",
        factorEmpate : "1.01",
        Resultado : "EMPATE",
        createdAt : new Date(), 
        updatedAt : new Date(), 
        juegoId : "1",
        categoriaId: "1",
      },
      {
        fecha : "2021-11-08 00:00:00+00",
        hora : "17:39:00",
        duracion: "3",
        estado : "Iniciado", 
        equipoA : "Joselitos",
        equipoB : "Joselitas2",
        factorA : "1",
        factorB : "1.02",
        factorEmpate : "1.01",
        Resultado : "EQUIPOA",
        createdAt : new Date(), 
        updatedAt : new Date(), 
        juegoId : "1",
        categoriaId: "2",
      },
      {
        fecha : "2021-11-10 00:00:00+00",
        hora : "09:39:00",
        duracion: "3",
        estado : "Finalizado", 
        equipoA : "Joselitos",
        equipoB : "Joselitas2",
        factorA : "1",
        factorB : "1.02",
        factorEmpate : "1.01",
        Resultado : "EQUIPOB",
        createdAt : new Date(), 
        updatedAt : new Date(), 
        juegoId : "3",
        categoriaId: "3",
      },
     
    ])

    await queryInterface.bulkInsert('Banner', [
      {
        nombre : "bannerprincipal",
        urlImagen : "https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-liga-peruana-final-desktop.jpg?v=1637901581",
        url: "/partidas",
        estado: "activo",
        createdAt : new Date(), 
        updatedAt : new Date()
      },
      {
        nombre : "banner2",
        urlImagen : "/https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-copa-libertadores-final-desktop.jpeg?v=1637963321",
        url: "/partidas",
        estado: "inactivo",
        createdAt : new Date(), 
        updatedAt : new Date()
      },
      {
        nombre : "banner3",
        urlImagen : "https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-nba-desktop-2.jpg?v=1637902479",
        estado: "activo",
        createdAt : new Date(), 
        updatedAt : new Date()
      },
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
