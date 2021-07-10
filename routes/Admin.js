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

const {isAuthenticated} = require('../helpers/auth')

//MULTER
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use(express.json())
rutas.use(par.array()) //para multer

/*Pagina de Inicio*/

rutas.get('/',(req,res)=>{
    //MOSTRAR TODOS LOS USUARIOS 
    //5 por pagina
    usuario.find({ })
    .then(rpta=>{        
        res.redirect('/admin/consultar-usuarios/1')
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error)
    })
})

//Consultar usuarios
rutas.get('/consultar-usuarios/:page', (req,res,next) =>{

    let perPage= 5;
    let page= req.params.page || 1;    
        usuario
        .find({})
        .skip((perPage * page)- perPage)
        .limit(perPage)
        .exec((err,usuarios) =>{
            usuario.countDocuments((err,count)=>{
                if(err) return next(err);
                res.render('listado-usuarios',{
                    usuarios, //lista que retorna .find .skip
                    current: page, //permitira crear la cantidad de nuevos botones
                    pages: Math.ceil(count/perPage), //numero de paginas que se van a generar redondeado al mayor                               
                })
            })
        })
})
//Crear usuario
rutas.get('/crear-usuario',(req,res)=>{
    res.render('agregar-usuarios')
})

rutas.post('/crear-usuario',async (req,res)=>{
    const {nombre,correo,rol}= req.body;   
    const password= "12345" 

    if(req.body.nombre.length == 0){
        res.render('agregar-usuarios')
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
            res.redirect('/admin/consultar-usuarios/1')
                       
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
        res.redirect('/admin/consultar-usuarios/1')             
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
                res.redirect('/admin/consultar-usuarios/1')            
        })                      
    } 
         
        
})


rutas.post('/filtrar-usuarios', (req,res)=>{
    //FILTRAR POR NOMBRE/CORREO Y ROL
    let perPage= 1000;
    let page= 1; 
    usuario
        .find(
        {
           $or:[{nombre: new RegExp('^'+ req.body.filtrado + '$',"i")}, 
                {correo:   new RegExp('^'+ req.body.filtrado + '$',"i")},
                {correo: {$regex: req.body.filtrado, $options: "i"} },
                {nombre: {$regex: req.body.filtrado, $options: "i"} }]                        
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, usuarios) => {
            usuario.countDocuments((err, count) => {
                if (err) return next(err);
                if(req.body.filtrado == ''){
                    res.redirect('/admin/consultar-usuarios/1')
                }
                else{
                res.render('listado-usuarios', {
                    usuarios, //lista que retorna .find .skip
                    current: page, //permitira crear la cantidad de nuevos botones
                    pages: Math.ceil(count / perPage), //numero de paginas que se van a generar redondeado al mayor                               
                })}
            })
        })   
})


//ORDENAR
rutas.post('/ordenar-usuarios', (req,res) =>{
    let perPage= 1000;
    let page= 1;  

    if(req.body.tipoOrdenado == "Admin"){
        usuario
        .find({ rol: 'Admin'})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, usuarios) => {
            usuario.countDocuments((err, count) => {
                if (err) return next(err);
                res.render('listado-usuarios', {
                    usuarios, 
                    current: page, 
                    pages: Math.ceil(count / perPage), 
                    })
                })
            }
        )
    }    

    else if(req.body.tipoOrdenado == "Organizador"){
        usuario
        .find({ rol: 'Organizador'})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, usuarios) => {
            usuario.countDocuments((err, count) => {
                if (err) return next(err);
                res.render('listado-usuarios', {
                    usuarios, 
                    current: page, 
                    pages: Math.ceil(count / perPage), 
                    })
                })
            }
        )
    }

    else if(req.body.tipoOrdenado == "Participante Líder"){
        usuario
        .find({ rol: 'Participante Líder'})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, usuarios) => {
            usuario.countDocuments((err, count) => {
                if (err) return next(err);
                res.render('listado-usuarios', {
                    usuarios, 
                    current: page, 
                    pages: Math.ceil(count / perPage), 
                    })
                })
            }
        )
    }

    else{
        res.redirect('/admin/consultar-usuarios/1')  
    }   
})


rutas.get('/editar-usuario', (req,res)=>{
    //ABRIR PAGINA EDITAR
    //ESCRIBIR LOS DATOS A EDITAR
    
    usuario.find(
        {
            _id: req.query.id            
        })
        .then(rpta=>{
            console.log(rpta)            
            res.render('editar-usuarios',{usuarios: rpta})
        })
        
})

rutas.post('/editar-usuario', (req,res)=>{
    //ENVIAR DATOS DE USUARIO EDITADO
    //CONFIRMAR QUE CORREO NO ESTE REGISTRADO PREVIAMENTE
    //mostrar mensaje de error en todo caso (no pop up)
    //res.redirect a listado de usuarios
    
    usuario.findOneAndUpdate( 
        {_id: req.body.idedit},

        {   nombre: req.body.nombre,
            rol: req.body.rol,
            correo: req.body.correo 
        },  
        {runValidators:true}       
    )   

    .then(rpta=>{
            console.log(rpta)
            res.redirect('/admin/consultar-usuarios/1')
    })   
})

rutas.post('/buscar-pagina', (req,res)=>{
    const pag= parseInt(req.body.paginado)
    res.redirect('/admin/consultar-usuarios/'+ pag)
})


module.exports =rutas