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

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer


//logeo de ususarios sign-up 2 






//inicio sesion
rutas.get('/',(req,res)=>{
    
    res.render('ingreso',{ layout: '../layouts/Signin' })
})



rutas.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign-in',
    
  }));








module.exports =rutas