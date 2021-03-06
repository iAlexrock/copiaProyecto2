'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ronda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ronda.hasMany(models.Partida,{foreignKey:'IdRonda',as:'partidas'})
      Ronda.belongsTo(models.Torneo,{foreignKey:'IdTorneo',as:'torneos'})
    }
  };
  Ronda.init({
    fecha: DataTypes.DATE,
    numRonda: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ronda',
  });
  return Ronda;
};