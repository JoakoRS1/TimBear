'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Juego.belongsTo(models.Categoria, {
        foreignKey : 'categoriaId'
      })
    }
  };
  Juego.init({
    nombre: DataTypes.STRING,
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Juego',
    freezeTableName : true
  });
  return Juego;
};