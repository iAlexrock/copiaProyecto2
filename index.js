const express = require ('express')
const http =require('http')
const bodyParser = require('body-parser')
const morgan = require ('morgan')

const hostname ='localhost'
const port =3000

//Instanciar a Express
const app= express()

//Configurar a Express
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(morgan('combined'))
app.use(express.static(__dirname +'/public'))
//Utilizar las rutas de Express Router
const r1 =require('./routes/login.js') 
const r2 =require('./routes/home.js')
const r3 =require('./routes/torneos.js') //fixture, posiciones
const r4 =require('./routes/usuario.js')


app.use('/login',r1)
app.use('/home',r2)
app.use('/torneos',r3)
app.use('/usuarios',r4)

//Instanciar al server http
const server= http.createServer(app)
server.listen(port,hostname,()=>{
    console.log("Servidor iniciado...")
})
