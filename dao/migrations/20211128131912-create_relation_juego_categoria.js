'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.addColumn('Juego','categoriaId',{
      type : Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.addConstraint('Juego',{
      fields : ['categoriaId'],
      type : 'FOREIGN KEY',
      name : 'FK_JUEGO_CATEGORIA',
      references :{
        table : 'Categoria',
        field : 'id'
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('Juego','FK_JUEGO_CATEGORIA')
     await queryInterface.removeColumn('Juego', 'categoriaId')
  }
};
