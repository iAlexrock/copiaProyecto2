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


rutas.get('/',(req,res)=>{
    //ingresar datos para registrarse
})
rutas.post('/',(req,res)=>{
    //agregar a tabla participante lider
    //error si ya fue usado
})
module.exports =rutas