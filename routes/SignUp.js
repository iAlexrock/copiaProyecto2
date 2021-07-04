const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
const  equipo= models.Equipo
const lider= models.Lider
const organizador=models.Organizador

const {Op}= require("sequelize")

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer


rutas.get('/',(req,res)=>{
    //ingresar datos para registrarse
    res.render('sign-up',{
        nombre:'', correo:'',contrasena:'',
        equipo:'', errorcorreo:false,
        errorequipo:false, layout: '../layouts/plantilla' })
})
rutas.post('/',(req,res)=>{
    //agregar a tabla participante lider
    //error si ya fue usado
    nombre= req.body.nombre
    correo=req.body.correo
    password=req.body.contrasena
    nombreequipo=req.body.nombreequipo
    errorcorreo=false
    errorequipo=false
    
    lider.findAll({where:{correo:correo}}).then(rpta=>{
        if(rpta.length!=0){
            errorcorreo=true
        }
        equipo.findAll({where:{nombre:nombreequipo}}).then(rpta2=>{
            if(rpta2.length!=0){
                errorequipo=true
            }
            //

        if(errorcorreo==true || errorequipo==true){
            //volver a cargar la pagina de registo mostrando los mensajes de erro
            res.render('sign-up',{
                nombre:nombre, correo:correo,contrasena:password,
                equipo:nombreequipo, errorcorreo:errorcorreo,
                errorequipo:errorequipo, layout: '../layouts/Signin' })
        }
        else{
            equipo.create({
                nombre:nombreequipo,
                integrantes: null
            }).then(rpta=>{
                lider.create({
                nombre:nombre,
                correo:correo,
                password:password,
                IdEquipo:rpta.id
                }).then(rpta2=>{
                    res.redirect('/')
                })
            })
            
            //Aqui va el codigo de que no hubo problema
            //se crea nuevo lider con sus respectivos campos
        }

        //
        })
        
    })
    
    /*if(equipo.findAll({
        where:{
            nombre:nombreequipo
        }
    }).length!=0){
        //nombre de equipo ya usado
        errorequipo=true
    }*/
    
    
    
})
module.exports =rutas