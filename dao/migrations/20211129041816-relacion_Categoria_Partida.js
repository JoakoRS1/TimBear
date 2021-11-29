'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Partida','categoriaId',{
      type : Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.addConstraint('Partida',{
      fields : ['categoriaId'],
      type : 'FOREIGN KEY',
      name : 'FK_PARTIDA_CATEGORIA',
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
     await queryInterface.removeConstraint('Partida','FK_PARTIDA_CATEGORIA')
     await queryInterface.removeColumn('Partida', 'categoriaId')
  }
};
