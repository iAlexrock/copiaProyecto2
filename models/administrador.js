const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administradorSchema = new Schema({
  nombre:  String,
  correo: String,
  password: String
});

// Crear el modelo
const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;
