'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    rol: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    DNI: DataTypes.STRING,
    correo: DataTypes.STRING,
    password: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    departamento: DataTypes.STRING,
    provincia: DataTypes.STRING,
    distrito: DataTypes.STRING,
    PEP: DataTypes.INTEGER,
    estado: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName : true
  });
  return Usuario;
};