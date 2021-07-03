const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
const  admin= models.Administrador
const lider= models.Lider
const organizador=models.Organizador

const {Op}= require("sequelize")

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer


rutas.get('/torneos',(req,res)=>{
  //mostrar torneos
})
rutas.post('/torneos',(req,res)=>{
  //filtrar torneos
})
rutas.get('/crear-torneo',(req,res)=>{
  //muestra pagina de creacion de torneo
})
rutas.post('/crear-torneo',(req,res)=>{
  //envia los campos del torneo creado
})
rutas.get('/editar-torneo',(req,res)=>{
  //muestra la pagina de editar los campos de el torneo seleccionado
})
rutas.post('/editar-torneo',(req,res)=>{
  //envia los campos editados del torneo
})
rutas.get('/organizar-torneo',(req,res)=>{
  //muestra pagina con info del torneo junto a botones: "ver equipos","ver fixture","ver tabla  "
})
rutas.get('/ver-equipos-torneo',(req,res)=>{
  //Mostrar listado de equipos
  //se puede seleccionar el estado de cada equipo en el torneo
  //ver integrantes de cada equipo al seleccionar "mostrar usuarios"
  //boton guardar y volver
})
rutas.post('/ver-equipos-torneo',(req,res)=>{
  //guarda los estados de los equipos del torneo
})
rutas.get('/ver-fixture-torneo',(req,res)=>{
  //Mostrar fixture de las rondas y partidas del torneo
  //Mostrar un selector de ganador por cada partida
})
rutas.post('/ver-fixture-torneo',(req,res)=>{
  //Guardar ganadores de cada partida editada
})
rutas.post('ver-tabla-torneo',(req,res)=>{
  //Mostrar tabla de posiciones
})


module.exports =rutas