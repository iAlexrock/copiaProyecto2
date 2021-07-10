const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()
var mongoose = require('mongoose');
const Sequelize = require('sequelize')
const models= require('../models')
//const  admin= models.Administrador
const lider= models.Lider
const equipotorneo=models.EquipoTorneo
const usuario=require('../models/usuario')
const torneo=models.Torneo
const equipo=models.Equipo
const {Op}= require("sequelize")

const user = require('../index')
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
          res.redirect('torneos')
      })
})


rutas.get('/torneos',async(req,res)=>{
    var ltorneos= await torneo.findAll( {} )
    var linscrito= await equipotorneo.findAll({
        where:{
            IdEquipo: req.user.equipo
        }
    })
        res.render('lider-vistatorneos',{ ltorneos, linscrito})
    
      
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
var LE = []

rutas.get('/editar-equipo',(req,res)=>{
    let errors = []
    
    equipo.findOne({where: {id:req.user.equipo}}
        ).then(rpta =>{
            res.render('editar-equipo',{errors, lequipo:rpta})
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
}
)
rutas.get('/inscripcion',(req,res)=>{
    equipotorneo.create({
        puntaje: 10000,
        estado: "inactivo",
        IdEquipo: req.user.equipo,
        IdTorneo: req.query.id
    }).then(rpta=>{
        res.redirect('torneos')
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