const express = require ('express')

const bodyParser = require('body-parser')

//Instanciar a Express
const app= express.Router() //ESTE ES EL MAIN CAMBIO

//Configurar a Express
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Definicion de rutas
app.post('/editar',(req,res,next)=>{
   //cambiar estado de torneo como organizador
})
//Exportar modulo para que otros modulos lo usen
module.exports=app