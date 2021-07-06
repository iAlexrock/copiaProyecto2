const express = require("express")
const bodyParser= require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models= require('../models')

const usuario=require('../models/usuario')

const passport=require('passport');


const equipo = models.Equipo
const  admin= models.Administrador
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

/*Pagina de Inicio*/
var LC= []
rutas.get('/', (req,res)=>{
    //MOSTRAR TODOS LOS USUARIOS 
    //5 por pagina
    usuario.find({ })
    .then(listaTipos=>{
        LC=listaTipos
        res.redirect('/admin/consultar-usuarios')
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error)
    })
})

//Consultar usuarios
rutas.get('/consultar-usuarios',(req,res) =>{
    usuario.find({})
    .then(rpta => {
        res.render('listado-usuarios', {lcasinos: LC, ljugadores: rpta})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error)
    })

})
//Crear usuario
rutas.get('/crear-usuario',(req,res)=>{
    res.render('agregar-usuarios', {lcasinos:LC, error:"false"})
})

rutas.post('/crear-usuario',async (req,res)=>{
    const {nombre,correo,rol}= req.body;   
    const password= "12345" 

    if(req.body.nombre.length == 0){

        res.render('agregar-usuarios', {lcasinos: LC, error: "true"})
    }   

    if(req.body.rol=="Admin"){
       const nuevousuario = new usuario({
            nombre: nombre,                
            correo: correo, 
            rol: rol,
            password: password         
        })       
            nuevousuario.password =  await nuevousuario.encryptPassword(password);   
            await nuevousuario.save(); 
            res.redirect('/admin/consultar-usuarios')
                       
    }
    else if(req.body.rol=="Organizador"){
        const nuevousuario= new usuario({
            nombre: nombre,                
            correo: correo,
            rol: rol,
            password: password             
        })    
        nuevousuario.password =  await nuevousuario.encryptPassword(password);   
        await nuevousuario.save(); 
        res.redirect('/admin/consultar-usuarios')             
    }
    else{
        equipo.create({
            nombre:"Equipo",
            integrantes: null
        }).then(async rpta=>{
            const nuevousuario= new usuario({
                nombre: nombre,
                correo: correo,  
                rol: rol,  
                password: password,
                IdEquipo:rpta.id
            })
            
                nuevousuario.password =  await nuevousuario.encryptPassword(password);   
                await nuevousuario.save();
                res.redirect('/admin/consultar-usuarios')            
            
        })                      
    } 
         
        
})


rutas.post('/filtrar-usuarios', (req,res)=>{
    //FILTRAR POR NOMBRE/CORREO Y ROL
    usuario.find(
        {
            where: {
                [Op.or]:{
                nombre:   {[Op.eq]: req.body.filtrado},
                correo : {                    
                    [Op.eq]: req.body.filtrado                
                } 
                }     
            }            
        })

        .then(rpta =>{
            if(rpta == ''){
                res.redirect('/admin/consultar-usuarios')
            }
            else{
                res.render('listado-usuarios', {lcasinos: LC, ljugadores: rpta})
            }            
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })    
})

//ORDENAR
rutas.post('/ordenar-usuarios', (req,res) =>{
    if(req.body.tipoOrdenado == "Admin"){
            usuario.find(
            {
                where: {rol:{[Op.eq]: req.body.tipoOrdenado}}
                
            })
            .then(rpta => {
                if (rpta == '') {
                    res.redirect('/admin/consultar-usuarios')
                }
                else {
                    res.render('listado-usuarios', { lcasinos: LC, ljugadores: rpta })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).send(error)
            })
    }   
    else if(req.body.tipoOrdenado == "Organizador"){
        usuario.findAll(
            {
                where: {rol:{[Op.eq]: req.body.tipoOrdenado}}
                
            })
            .then(rpta => {
                if (rpta == '') {
                    res.redirect('/admin/consultar-usuarios')
                }
                else {
                    res.render('listado-usuarios', { lcasinos: LC, ljugadores: rpta })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).send(error)
            })
    }    
    else if(req.body.tipoOrdenado == "Participante Líder"){
        usuario.findAll(
            {
                where: {rol:{[Op.eq]: req.body.tipoOrdenado}}
                
            })
            .then(rpta => {
                if (rpta == '') {
                    res.redirect('/admin/consultar-usuarios')
                }
                else {
                    res.render('listado-usuarios', { lcasinos: LC, ljugadores: rpta })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).send(error)
            })
    }
    else{
        lista.findAll({})
        .then(rpta => {
            if (rpta == '') {
                res.redirect('/admin/consultar-usuarios')
            }
            else {
                res.render('listado-usuarios', { lcasinos: LC, ljugadores: rpta })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
    }       
})


rutas.get('/editar-usuario', (req,res)=>{
    //ABRIR PAGINA EDITAR
    //ESCRIBIR LOS DATOS A EDITAR
    lista.findAll(
        {
            where: {id: req.query.id}            
        })
        .then(rpta=>{
            res.render('editar-usuarios',{lcasinos: LC, ljugadores: rpta, confirmalo: "false", error:"false"})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })

})
rutas.post('/editar-usuario', (req,res)=>{
    //ENVIAR DATOS DE USUARIO EDITADO
    //CONFIRMAR QUE CORREO NO ESTE REGISTRADO PREVIAMENTE
    //mostrar mensaje de error en todo caso (no pop up)
    //res.redirect a listado de usuarios
    if(req.body.nombre.length==0){
        return lista.findAll({
            where: {id:req.body.idedit}
        })
        .then(rpta=>{
            res.render('editar-usuarios', {lcasinos: LC,ljugadores:rpta,confirmalo:"false" ,error: "true"})
        })        
    }

    return lista.update({
        nombre: req.body.nombre,
        rol: req.body.rol,
        correo: req.body.correo      
        
    }, 
    {
        where: {id:{[Op.eq]: req.body.idedit}}
    }
    )
    .then(rpta=>{
            res.redirect('consultar-usuarios')
    })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
})

module.exports =rutas