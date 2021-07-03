'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipo.hasOne(models.Lider,{foreignKey:'IdEquipo', as:'liders'})
      Equipo.hasMany(models.EquipoTorneo,{foreignKey:'IdEquipo', as:'equipotorneos'})
      Equipo.hasMany(models.Partida,{foreignKey:'IdEquipo1', as:'p1'})
      Equipo.hasMany(models.Partida,{foreignKey:'IdEquipo2', as:'p2'})
    }
  };
  Equipo.init({
    nombre: DataTypes.STRING,
    integrantes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Equipo',
  });
  return Equipo;
};