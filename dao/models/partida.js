'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Partida.belongsTo(models.Juego, {
        foreignKey : 'juegoId'
      })
    }
  };
  Partida.init({
    nombre: DataTypes.STRING,
    juego: DataTypes.STRING,
    fecha: DataTypes.DATE,
    hora: DataTypes.DATE,
    duracion: DataTypes.DATE,
    estado: DataTypes.INTEGER,
    equipoA: DataTypes.STRING,
    equipoB: DataTypes.STRING,
    factorA: DataTypes.FLOAT,
    factorB: DataTypes.FLOAT,
    factorEmpate: DataTypes.FLOAT,
    Resultado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partida',
    freezeTableName : true
  });
  return Partida;
};