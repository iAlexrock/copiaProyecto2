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

/*Pagina de Inicio*/

rutas.get('/usuarios', (req,res)=>{
    //MOSTRAR TODOS LOS USUARIOS 
    //5 por pagina
})
rutas.post('/usuarios', (req,res)=>{
    //FILTRAR POR NOMBRE/CORREO Y ROL
})
rutas.get('/editar-usuario', (req,res)=>{
    //ABRIR PAGINA EDITAR
    //ESCRIBIR LOS DATOS A EDITAR
})
rutas.post('/editar-usuario', (req,res)=>{
    //ENVIAR DATOS DE USUARIO EDITADO
    //CONFIRMAR QUE CORREO NO ESTE REGISTRADO PREVIAMENTE
    //mostrar mensaje de error en todo caso (no pop up)
    //res.redirect a listado de usuarios
})
rutas.get('/crear-usuario',(req,res)=>{

})
rutas.post('/crear-usuario',(req,res)=>{
    
})
module.exports =rutas