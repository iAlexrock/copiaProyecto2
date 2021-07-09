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
var inicio

rutas.get('/',(req,res)=>{
    let errors = [];

    res.render('sign-up',{errors, layout: '../layouts/Signin' })
})


rutas.post('/',async (req,res)=>{
  
    let errors = [];
    const {nombre,correo,password,confirm_password,nombreequipo}= req.body;

    if(password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden.'});
      }
    if(password.length == 0) {
        errors.push({text: 'La contraseña es muy corta.'})
      }
    if(nombre ==""){
        errors.push({text: 'El nombre está en blanco.'});
      }
    if(correo ==""){
        errors.push({text: 'El correo está en blanco.'});
      }
    if(password ==""){
        errors.push({text: 'La contraseña está en blanco.'});
      }
      if(equipo==""){
        errors.push({text:'El nombre del equipo está en blanco.'})
      }
    

    if(errors.length > 0){
        res.render('sign-up', {errors, layout: '../layouts/Signin' });
    }else{
        //validacion de correo
        const usuariocorreo = await usuario.findOne({correo:correo}) //buscar coincidencias de correo en la BD
        const equipousado= await equipo.findOne({where:{nombre:nombreequipo}})//buscar coincidencias nombre equipo
        if(usuariocorreo){ //si se encuentra usuario
          errors.push({text: 'Correo ya registrado.'});
        }
        if(equipousado){
          errors.push({text: 'Nombre de equipo ya registrado.'})
        }

        if (errors.length>0){
          res.render('sign-up',{errors,layout: '../layouts/Signin' })
        }else{
          var idequipo= await equipo.create({
                      nombre:nombreequipo,
                      integrantes: null})
          const nuevousuario=  new usuario({nombre,correo,password,rol:'Participante Líder', equipo:idequipo.id});
          nuevousuario.password =  await nuevousuario.encryptPassword(password);
          await nuevousuario.save();
          
          req.flash('success_msg', 'usuario y equipo creados correctamente');
          res.redirect('/')
        
        }
      }

    




    
});








module.exports =rutas