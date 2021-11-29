'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Partida', 'categoriaId', {
      type : Sequelize.INTEGER,
      allownull : false
    })

    await queryInterface.addConstraint('Partida', {
      fields : ['categoriaId'],
      type : 'FOREIGN_KEY',
      name : 'FK_PARTIDA_CATEGORIA',
      references : {
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
  }
};
