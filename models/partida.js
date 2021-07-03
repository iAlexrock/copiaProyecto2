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
      // define association here
      Partida.belongsTo(models.Ronda,{foreignKey:'IdRonda',as:'rondas'})
      Partida.belongsTo(models.Equipo,{foreignKey:'IdEquipo1',as:'e1'})
      Partida.belongsTo(models.Equipo,{foreignKey:'IdEquipo2',as:'e2'})
    }
  };
  Partida.init({
    ganador: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Partida',
  });
  return Partida;
};