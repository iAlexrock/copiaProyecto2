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


rutas.get('/',(req,res)=>{
    
    res.render('logeo',{ layout: '../layouts/Signin' })
})


rutas.post('/',async (req,res)=>{
    const {nombre,correo,password,confirm_password}= req.body;
    
    const nuevousuario=  new usuario({nombre,correo,password});
    
    nuevousuario.password =  await nuevousuario.encryptPassword(password);
    
    await nuevousuario.save();

    res.redirect('/')
});








module.exports =rutas