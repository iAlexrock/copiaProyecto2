const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()
var mongoose = require('mongoose');
const Sequelize = require('sequelize')
const models= require('../models')
//const  admin= models.Administrador
const lider= models.Lider
const organizador=models.Organizador
const usuario=require('../models/usuario')

const {Op}= require("sequelize")

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer

rutas.get('/', (req,res)=>{
    res.redirect('lider/torneos')
})


rutas.get('/torneos',(req,res)=>{
    res.render('lider-vistatorneos')
})

rutas.get('/editar-perfil',(req,res)=>{
    usuario.find(
        {
            id: req.query.id            
        })
        .then(rpta=>{
            console.log(rpta)
            res.render('editar-perfil')
        })
})

rutas.post('/editar-perfil',(req,res)=>{
    usuario.findOneAndUpdate( 
        {_id: req.body.idU},

        {   
            nombre: req.body.nombre,
            correo: req.body.correo,
            password: req.body.contra
        },  
        {runValidators:true}       
    )   
    .then(rpta=>{
            console.log(rpta)
            res.redirect('torneos')
    }) 

})

rutas.get('/editar-equipo',(req,res)=>{

    res.render('editar-equipo')

})

rutas.post('/editar-equipo',(req,res)=>{
    usuario.findOneAndUpdate(
        {_id: req.body.idU},
        {
            equipo: req.body.equipo
        },
        {runValidators:true})
        .then(rpta=>{
            res.redirect('torneos')
        })
    //mostrar listado de  torneos, si no se está inscrito aparece boton "incribirse"
})

rutas.post('/retroceder-lider',(req,res)=>{
    res.redirect('torneos')
    //mostrar listado de  torneos, si no se está inscrito aparece boton "incribirse"
})

module.exports =rutas