const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
// const  admin= models.Administrador
const lider= models.Lider
const organizador=models.Organizador
const torneo=models.Torneo

const {Op}= require("sequelize")

const {isAuthenticated} = require('../helpers/auth')

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer

var LT = []
rutas.get('/',(req,res)=>{
  torneo.findAll( {} )
      .then(ltorneos =>{
          LT = ltorneos
      })
      .catch( error =>{
          console.log(error)
          res.status(500).send(error)
      })
})


rutas.get('/torneos',isAuthenticated,(req,res)=>{
  //mostrar torneos
  torneo.findAll( {} )
    .then(rpta=>{
        res.render('org-torneo',{ltorneos: rpta})
    })
    .catch( error =>{
        console.log(error)
        res.status(500).send(error)
    })
})

rutas.get('/creartorneo',isAuthenticated,(req,res)=>{
  //muestra pagina de creacion de torneo
  res.render('creartorneo')
})
 
rutas.post('/creartorneo',isAuthenticated,(req,res)=>{
  //envia los campos del torneo creado
  const aviso = req.body.descripcion
  console.log("------------------>>>>>>>>>>>>>>"+req.body.aviso)
  console.log(aviso)
  if(req.body.aviso=="on")
  {
    console.log("aviso tabla creada bien")
  } 
  torneo.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fecha_ini: req.body.fecha_ini,
    fecha_fin: req.body.fecha_fin,
    maxParticipantes: req.body.maxParticipantes,
    tipo: req.body.tipo,
    partidasxDia: req.body.partidasxDia,
    puntajeGanar: req.body.puntajeGanar,
    puntajePerder: req.body.puntajePerder,
    puntajeEmpatar: req.body.puntajeEmpatar,
    estado: 'abierto',
    IdOrganizador: 1
     
  }).then(rpta =>{
    
    res.redirect('torneos')
  })
  .catch( error =>{
    console.log(error)
    res.status(500).send(error)
  })
})

rutas.post('/retroceder',(req,res)=>{
  res.redirect('torneos')
})
rutas.get('/editar-torneo',(req,res)=>{
  //muestra la pagina de editar los campos de el torneo seleccionado
  res.render('editar-torneo')
})
rutas.post('/editar-torneo2',(req,res)=>{
  //envia los campos editados del torneo
})
rutas.get('/organizar-torneo',(req,res)=>{
  //muestra pagina con info del torneo junto a botones: "ver equipos","ver fixture","ver tabla  "
})
rutas.get('/ver-equipos-torneo',(req,res)=>{
  //Mostrar listado de equipos
  //se puede seleccionar el estado de cada equipo en el torneo
  //ver integrantes de cada equipo al seleccionar "mostrar usuarios"
  //boton guardar y volver
})
rutas.post('/ver-equipos-torneo',(req,res)=>{
  //guarda los estados de los equipos del torneo
})
rutas.get('/ver-fixture-torneo',(req,res)=>{
  //Mostrar fixture de las rondas y partidas del torneo
  //Mostrar un selector de ganador por cada partida
})
rutas.post('/ver-fixture-torneo',(req,res)=>{
  //Guardar ganadores de cada partida editada
})
rutas.post('ver-tabla-torneo',(req,res)=>{
  //Mostrar tabla de posiciones
})


module.exports =rutas