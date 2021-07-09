const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize')
const models= require('../models')
//const  admin= models.Administrador
const lider= models.Lider
const organizador=models.Organizador
const usuario=require('../models/usuario')
const torneo=models.Torneo
const equipo=models.Equipo
const {Op}= require("sequelize")

const user = require('../index')
//MULTER
const multer = require('multer');
const { findById } = require("../models/usuario");
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
    const usuarioAnterior = req.body.correo
    if(req.user.correo==req.body.correo){
            console.log(usuarioAnterior)
            await usuario.findOneAndUpdate( 
                {_id: req.body.idU},
                {   
                    nombre: req.body.nombre,
                    correo: req.body.correo
                },  
                {runValidators:true}       
            )   
            .then(rpta=>{
                    console.log(rpta)
                    res.redirect('torneos')
            })
    }else{
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
                    correo: req.body.correo
                },  
                {runValidators:true}       
            )   
            .then(rpta=>{
                    console.log(rpta)
                    res.redirect('torneos')
            })
          }
    }
})
var LE = []

rutas.get('/editar-equipo',(req,res)=>{
    let errors = []
    
    equipo.findOne({where: {id:req.user.equipo}}
        ).then(rpta =>{
            LE = rpta
            res.render('editar-equipo',{errors, lequipo:LE})
        })
})

rutas.post('/editar-equipo',async(req,res)=>{
    let errors = [];
    equipo.findAll({
        where:{
            nombre:req.body.nombreEquipo,
            id:{[Op.ne]:req.body.equipo}
        }
    }).then(rpta =>{
        if(rpta.length!=0){
            errors.push({text: 'Equipo ya registrado.'});
            return equipo.findAll({
                where:{
                    id:req.body.equipo
                }
            }).then(rpta =>{
                console.log(rpta.id),
                res.render('editar-equipo',{errors,lequipo:LE})
            })
        }else{
            return equipo.update({
                nombre: req.body.nombreEquipo,
                integrantes: req.body.integrantes
            },{
                where:{
                    id:{[Op.eq]:req.body.equipo
                }}
            }).then(rpta=>{
                res.redirect('torneos')
            })
        }
    })

    
})


    


rutas.post('/retroceder-lider',(req,res)=>{
    res.redirect('torneos')
})
rutas.get('/ver-torneo',(req,res)=>{
    torneo.findOne({
        where:{id:req.query.id}
    }).then(rpta=>{
        res.render('lider-ver-torneo',{torneo: rpta})
    })
})

module.exports =rutas