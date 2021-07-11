const express = require("express")
const bodyParser= require("body-parser")

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
// const  admin= models.Administrador
const lider= models.Lider
const equipo=models.Equipo
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
  let errors = []
  //muestra pagina de creacion de torneo
  res.render('creartorneo',{listatorneos: LT,errors})
})
 
rutas.post('/creartorneo',isAuthenticated,(req,res)=>{
  //envia los campos del torneo creado
  /*const aviso = req.body.descripcion
  console.log("------------------>>>>>>>>>>>>>>"+req.body.aviso)
  console.log(aviso)
  if(req.body.aviso=="on")
  {
    console.log("aviso tabla creada bien")
  } */
  let errors = [];
  if(req.body.nombre.length==0){
    res.render('creartorneo',{listatorneos: LT,errors})
  }else{
    torneo.findAll({
      where:{
        nombre:req.body.nombre
      }
    }).then(rpta =>{
      if(rpta.length!=0){
        errors.push({text: 'Nombre de Torneo ya registrado.'});
        res.render('creartorneo',{listatorneos: LT,errors})
      }else{
        const parti=0
        torneo.create({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          fecha_ini: req.body.fecha_ini,
          fecha_fin: req.body.fecha_fin,
          maxParticipantes: req.body.maxParticipantes,
          numParticipantes: parti,
          tipo: "todos contra todos",
          partidasxDia: req.body.partidasxDia,
          puntajeGanar: req.body.puntajeGanar,
          puntajePerder: req.body.puntajePerder,
          puntajeEmpatar: req.body.puntajeEmpatar,
          estado: 'abierto'
           
        }).then(rpta =>{
          
          res.redirect('/organizador/consultar-torneos/1')
        })
        .catch( error =>{
          console.log(error)
          res.status(500).send(error)
        })
      }
    })
  }
  
})

rutas.get('/retroceder',isAuthenticated,(req,res)=>{
  res.redirect('/organizador/consultar-torneos/1')
})
var LTor = []
rutas.get('/editar-torneo',isAuthenticated,(req,res)=>{
  let errors = [];
  return torneo.findAll({
        where:{
            id: req.query.id
        }
    })
    .then(rpta =>{
        console.log(rpta.id)
        LTor = rpta
        res.render('editar-torneo',{ltorneos:LTor,errors})
    })
    .catch( error =>{
        console.log(error)
        res.status(500).send(error)
    })
})
rutas.post('/editar-torneo',isAuthenticated,(req,res)=>{
  //envia los campos editados del torneo
  let errors = [];
  torneo.findAll({
    where:{
      nombre:req.body.nombre,
      id:{[Op.ne]:req.body.id}
    }
  }).then(rpta =>{
    if(rpta.length!=0){
      errors.push({text: 'Nombre de Torneo ya registrado.'});
      return torneo.findAll({
          where:{
              id:req.body.id
          }
      }).then(rpta =>{
          console.log(rpta.id),
          res.render('editar-torneo',{ltorneos:LTor,errors})
      })
  }else{
    return torneo.update(
      {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha_ini: req.body.fecha_ini,
        fecha_fin: req.body.fecha_fin,
        partidasxDia: req.body.partidasxDia,
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
        res.redirect('/organizador/consultar-torneos/1')
      })
      .catch( error =>{
        console.log(error)
        res.status(500).send(error)
    })
  }
  })
  
})

rutas.get('/organizar-torneo',isAuthenticated,(req,res)=>{
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



rutas.get('/ver-equipos-torneo',isAuthenticated,async (req,res)=>{
  
  const infot= await torneo.findOne({//recoge info del torneo en cuestión
    where: {id: req.query.torneo}
  })
  const idequipos= await equipoTorneo.findAll({//recoge a todos los equipos participantes del torneo
    where:{IdTorneo:infot.id}
  })
  const lequipos= await equipo.findAll({  //recoge a todos los equipos
  })
  

    res.render('org-equipostorneo',{torneo:infot,idequipos,lequipos  } )
  
  
  //Mostrar listado de equipos
  //se puede seleccionar el estado de cada equipo en el torneo
  //ver integrantes de cada equipo al seleccionar "mostrar usuarios"
  //boton guardar y volver
})
rutas.post('/ver-equipos-torneo',isAuthenticated,(req,res)=>{
  //guarda los estados de los equipos del torneo
})
rutas.get('/ver-fixture-torneo',isAuthenticated,(req,res)=>{
  torneo.findOne({
    where: {id: req.query.torneo}
  }).then(rpta=>{
    res.render('org-fixture',{torneo:rpta} )
  })
  //Mostrar fixture de las rondas y partidas del torneo
  //Mostrar un selector de ganador por cada partida
})
rutas.post('/ver-fixture-torneo',isAuthenticated,(req,res)=>{
  //Guardar ganadores de cada partida editada
})
rutas.get('/ver-tabla-torneo',isAuthenticated,async(req,res)=>{
  //se necesita equipotorneo(encontrar equipos), equipo (nombre), torneo (puntajes,id ) ronda (partidas),partidas (ganador),
  const torneos= await torneo.findOne({
    where: {id: req.query.torneo}
  })
  return equipoTorneo.findAll({
      where:{IdTorneo:req.query.torneo}
      }).then(rpta=>{
        res.render('org-tablatorneo', {lequipos:rpta, torneo:torneos})
  
  }).catch( error =>{
    console.log(error)
    res.status(500).send(error)
})
})

rutas.get('/consultar-torneos/:page',isAuthenticated, (req,res,next) =>{

  let perPage= 5;
  let page= req.params.page || 1;    
      torneo
      .findAll({
        offset:(perPage * page)- perPage,
        limit: perPage
      })
      .then((torneos) =>{
          torneo.count().then(count=>{
            if(count==0) return next(0);
            res.render('org-listado-torneos',{
                  torneos, //lista que retorna .find .skip
                  current: page, //permitira crear la cantidad de nuevos botones
                  pages: Math.ceil(count/perPage), //numero de paginas que se van a generar redondeado al mayor                               
              })
          })
      }).catch( error =>{
        console.log(error)
        res.status(500).send(error)
    })
})


function CalcularFixture (equipos){
  var longitud= equipos.length//5
  var n=longitud -1
  var e1=[]
  var e2=[]
  for (var i=0;i<longitud*(longitud-1)/2;i++){//5 rondas
    while(n>0){
      e1.append(equipo[i])
      e2.append(equipo[n])
      n=n-1
    }
    //transformar equipos
  }
}
module.exports =rutas