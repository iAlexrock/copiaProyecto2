'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipoTorneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EquipoTorneo.belongsTo(models.Equipo,{foreignKey:'IdEquipo',as:'equipos'})
      EquipoTorneo.belongsTo(models.Torneo,{foreignKey:'IdTorneo',as:'torneos'})

    }
  };
  EquipoTorneo.init({
    puntaje: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EquipoTorneo',
  });
  return EquipoTorneo;
};