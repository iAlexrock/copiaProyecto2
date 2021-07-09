const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
// const  admin= models.Administrador
const lider= models.Lider
const organizador=models.Organizador
const torneo=models.Torneo
const equipoTorneo= models.EquipoTorneo

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
    estado: 'abierto'
     
  }).then(rpta =>{
    
    res.redirect('torneos')
  })
  .catch( error =>{
    console.log(error)
    res.status(500).send(error)
  })
})

rutas.get('/retroceder',(req,res)=>{
  res.redirect('torneos')
})

rutas.get('/editar-torneo',(req,res)=>{
  return torneo.findAll({
        where:{
            id: req.query.id
        }
    })
    .then(rpta =>{
        console.log(rpta.id)
        res.render('editar-torneo',{ltorneos:rpta})
    })
    .catch( error =>{
        console.log(error)
        res.status(500).send(error)
    })
})
rutas.post('/editar-torneo',(req,res)=>{
  //envia los campos editados del torneo
  return torneo.update(
    {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      fecha_ini: req.body.fecha_ini,
      fecha_fin: req.body.fecha_fin,
      partidasxDia: req.body.gananciaAcum,
      puntajeGanar: req.body.puntajeGanar,
      puntajePerder: req.body.puntajePerder,
      puntajeEmpatar: req.body.puntajeEmpatar,
      estado: req.body.estadotorneo
    },{
    where:{
        id:{[Op.eq]:req.body.id}
    }
    })
    .then(rpta =>{
      res.redirect('/organizador/torneos')
    })
    .catch( error =>{
      console.log(error)
      res.status(500).send(error)
  })
})
rutas.get('/organizar-torneo',(req,res)=>{
  torneo.findOne({
    where: {id: req.query.id}
  }).then(rpta=>{
    res.render('organizador-organizart', {torneo:rpta})
  })
  .catch( error =>{
    console.log(error)
    res.status(500).send(error)
})
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
rutas.get('/ver-tabla-torneo',(req,res)=>{
  return equipoTorneo.findAll({
      where:{IdTorneo:req.query.torneo}
      }).then(rpta=>{
        res.render('org-tablatorneo', {lequipos:rpta})
  
  }).catch( error =>{
    console.log(error)
    res.status(500).send(error)
})
})


module.exports =rutas