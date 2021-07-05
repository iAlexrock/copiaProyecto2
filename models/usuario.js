const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre:  String,
  correo: String,
  password: String,
  rol:String,
  equipo:String
});

// Crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;



