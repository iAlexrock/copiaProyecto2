const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')
const  torneo= models.Torneo

const {Op}= require("sequelize")

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer


rutas.get('/consultarTodo',(req,res)=>{
    return torneo.findAll(
        {
            //añadir condicion "solo torneos en curso"
})
    .then(torneo=> res.status(200).send(torneo))
    .catch(error=> res.status(400).send(error))
})

module.exports =rutas;