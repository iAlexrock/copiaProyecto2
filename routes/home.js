const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
const  equipo= models.Equipo
const lider= models.Lider
const organizador=models.Organizador

const usuario=require('../models/usuario')

const passport=require('passport');

const {Op}= require("sequelize")

const app = express();
const {isAuthenticated} = require('../helpers/auth')
//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer


//logeo de ususarios sign-up 2 

var rolo =""
//inicio sesion
rutas.get('/',isAuthenticated, (req,res)=>{
  let errors = [];
  console.log("------------>" + rolo)
 
   rolo=req.user.rol
   console.log("------------->>"+ rolo)
    res.render('home')
})



module.exports =rutas