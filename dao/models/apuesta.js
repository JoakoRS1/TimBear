'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Apuesta.init({
    equipoA: DataTypes.STRING,
    equipoB: DataTypes.STRING,
    equipoApostado: DataTypes.STRING,
    factorApostado: DataTypes.FLOAT,
    monto: DataTypes.FLOAT,
    gananciaPosible: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Apuesta',
    freezeTableName : true
  });
  return Apuesta;
};