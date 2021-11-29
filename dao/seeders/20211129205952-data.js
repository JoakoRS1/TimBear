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

<<<<<<< HEAD
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



=======
    await queryInterface.bulkInsert('Usuario',[
      {
        rol: "admin",
        nombre: "Alessandra",
        apellido: "Ortega",
        DNI: "74456084",
        correo : "ale@mail.com",
        password : "hola123",
        numero: 581310130,
        direccion: "Jiron Calle 237",
        distrito : "La Molina",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 0,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "admin",
        nombre: "Samantha",
        apellido: "Perez",
        DNI: "84101334",
        correo : "sam@mail.com",
        password : "sam123",
        numero: 263099103,
        direccion: "Calle Falsa 987",
        distrito : "Surco",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "admin",
        nombre: "Joaquin",
        apellido: "Rodriguez",
        DNI: "08161390",
        correo : "joaco@mail.com",
        password : "joaco123",
        numero: 91391380,
        direccion: "Avenida ABC 1790",
        distrito : "San Isidro",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "admin",
        nombre: "Alessia",
        apellido: "Cornejo",
        DNI: "29108398",
        correo : "alessia@mail.com",
        password : "alessia123",
        numero: 74809109,
        direccion: "Calle 31 129",
        distrito : "San Borja",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "admin",
        nombre: "Alonso",
        apellido: "Calmet",
        DNI: "201282482",
        correo : "alonso@mail.com",
        password : "alonso123",
        numero: 98109330,
        direccion: "Jiron La Calle 728",
        distrito : "Lince",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "admin",
        nombre: "Cinthia",
        apellido: "Costa",
        DNI: "71836919",
        correo : "cinthia@mail.com",
        password : "cinthia123",
        numero: 381093013,
        direccion: "Calle XYZ 123",
        distrito : "Miraflores",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "user",
        nombre: "Billy",
        apellido: "Grados",
        DNI: "79191787",
        correo : "billy@gmail.com",
        password : "billy123",
        numero: 87310101,
        direccion: "Av.La Calle 123",
        distrito : "Surco",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 0,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "user",
        nombre: "Luis Mi",
        apellido: "Guel",
        DNI: "287901933",
        correo : "luismi@gmail.com",
        password : "luisitorey",
        numero: 71803220,
        direccion: "Av. La Avenida 1290",
        distrito : "Barranco",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "user",
        nombre: "John",
        apellido: "Doe",
        DNI: "087357198",
        correo : "johny@gmail.com",
        password : "123",
        numero: 98787167,
        direccion: "Jiron PW 702",
        distrito : "Surco",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "user",
        nombre: "Juan",
        apellido: "Perez",
        DNI: "09613793",
        correo : "juan@gmail.com",
        password : "juan",
        numero: 80731009,
        direccion: "Calle LP 618",
        distrito : "Surco",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        rol: "user",
        nombre: "Diana",
        apellido: "Ramirez",
        DNI: "09193736",
        correo : "diana@gmail.com",
        password : "diana",
        numero: 9983977,
        direccion: "Calle LP 133",
        distrito : "San Isidro",
        provincia : "Lima",
        departamento: "Lima",
        PEP : 0,
        estado : 0,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    
    ])
>>>>>>> f6d59c5af3c9dada39165c5c13fc27cca27218d0



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
