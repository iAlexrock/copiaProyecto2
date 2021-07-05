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
    let errors = [];

    res.render('logeo',{errors, layout: '../layouts/Signin' })
})


rutas.post('/',async (req,res)=>{
    let errors = [];
    const {nombre,correo,password,confirm_password}= req.body;

    if(password != confirm_password) {
        errors.push({text: 'las Ccntraseñas no coinciden'});
      }
    if(password.length == 0) {
        errors.push({text: 'La contraseña es muy corta'})
      }
    if(nombre ==""){
        errors.push({text: 'nombre en blanco'});
      }
    if(correo ==""){
        errors.push({text: 'correo en blanco'});
      }
    if(password ==""){
        errors.push({text: 'password en blanco'});
      }


    if(errors.length > 0){
        res.render('logeo', {errors, layout: '../layouts/Signin' });
    }else{
        //validacion de correo
        const usuariocorreo = await usuario.findOne({correo:correo})
        if(usuariocorreo){
            errors.push({text: 'Contraseña ya usada mamabicho, no es necesario logearte nuevamente '});
            res.render('ingreso',{errors,layout: '../layouts/Signin' })
        }
        else{
            const nuevousuario=  new usuario({nombre,correo,password});
            nuevousuario.password =  await nuevousuario.encryptPassword(password);
            await nuevousuario.save();
            req.flash('success_msg', 'usuario  creado correctamente');
            res.redirect('/organizador/creartorneo')
        
        }
      }

    




    
});








module.exports =rutas