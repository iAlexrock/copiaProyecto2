const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
//const  admin= models.Administrador
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
    //mostrar listado de  torneos, si no se está inscrito aparece boton "incribirse"
})
rutas.post('/torneos',(req,res)=>{
    //filtrar torneos
})
rutas.get('/ver-tabla-torneo',(req,res)=>{
    //mostrar posicion de equipos relativa a torneo
})
rutas.get('/ver-fixture',(req,res)=>{
    //ver fixture
})
rutas.get('/perfil',(req,res)=>{
    //ver perfil y su info, poder hacer cambios
})
rutas.post('/perfil',(req,res)=>{
    //guardar cambios de perfil
    //mostrar error si correo ya ha sido elegido
})
rutas.get('/mi-equipo',(req,res)=>{
    //mostrar daos del equipo, hacer cambios
    //boton guardar
})
rutas.post('mi-equipo',(req,res)=>{
    //mostrar error si al guardar el nombre del equipo ya ha sido usado.
})
module.exports =rutas