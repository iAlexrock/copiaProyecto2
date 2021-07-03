'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Torneo.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fecha_ini: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    maxParticipantes: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    partidasxDia: DataTypes.INTEGER,
    puntajeGanar: DataTypes.INTEGER,
    puntajePerder: DataTypes.INTEGER,
    puntajeEmpatar: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    numRondas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Torneo',
  });
  return Torneo;
};