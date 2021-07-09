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
const torneo=models.Torneo
const {Op}= require("sequelize")

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer

var LT = []
rutas.get('/', (req,res)=>{
    torneo.findAll( {} )
      .then(ltorneos =>{
          LT = ltorneos
      })
})


rutas.get('/torneos',(req,res)=>{
    
    torneo.findAll( {} )
    .then(rpta=>{
        res.render('lider-vistatorneos',{ ltorneos: rpta})
    })
      
})

rutas.get('/editar-perfil',(req,res)=>{
    let errors = [];
    usuario.find(
        {
            id: req.query.id            
        })
        .then(rpta=>{
            console.log(rpta)
            res.render('editar-perfil',{errors})
        })
})

rutas.post('/editar-perfil',async (req,res)=>{
    let errors = [];
    const usuariocorreo = await usuario.findOne({correo: req.body.correo}) 
    if (usuariocorreo){
        errors.push({text: 'Correo ya registrado'})
    }

    if (errors.length>0){
        res.render('editar-perfil',{errors})
      }else{
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
      }
})

rutas.get('/editar-equipo',(req,res)=>{
    let errors = [];
    res.render('editar-equipo',{errors})

})

rutas.post('/editar-equipo',async(req,res)=>{
    let errors = [];
    const usuarioequipo = await usuario.findOne({equipo: req.body.equipo}) 
    if (usuarioequipo){
        errors.push({text: 'Equipo ya registrado'})
    }

    if (errors.length>0){
        res.render('editar-equipo',{errors})
      }else{
        usuario.findOneAndUpdate(
            {_id: req.body.idU},
            {
                equipo: req.body.equipo
            },
            {runValidators:true})
            .then(rpta=>{
                res.redirect('torneos')
            })
        }
    //mostrar listado de  torneos, si no se está inscrito aparece boton "incribirse"
})

rutas.post('/retroceder-lider',(req,res)=>{
    res.redirect('torneos')
    //mostrar listado de  torneos, si no se está inscrito aparece boton "incribirse"
})

module.exports =rutas