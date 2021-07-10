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



rutas.get('/',isAuthenticated,(req,res)=>{
    //MOSTRAR TODOS LOS USUARIOS 
    //5 por pagina
    
    usuario.find({ })
    .then(rpta=>{        
        const holaa = req.user.rol
        if(holaa=="Admin"){
           res.redirect('/admin/consultar-usuarios/1') 
        }else{
               
              req.flash('error_msg', 'no erees admin');
            res.redirect('../../home')
        }
        
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error)
    })
})

//Consultar usuarios
rutas.get('/consultar-usuarios/:page',isAuthenticated, (req,res,next) =>{

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
rutas.get('/crear-usuario',isAuthenticated,(req,res)=>{
    let errors = [];


    res.render('agregar-usuarios',{errors})
})

rutas.post('/crear-usuario',isAuthenticated,async (req,res)=>{
    const {nombre,correo,rol}= req.body;   
    const password= "12345" 
    let errors = [];
    


    if(req.body.nombre.length == 0){
        errors.push({text: 'no se ha ingresado un nombre'});
    }   

    const usuariocorreo = await usuario.findOne({correo:correo}) 
    if(usuariocorreo){ //si se encuentra usuario
        errors.push({text: 'Correo ya registrado.'});
      }


    
    if (errors.length>0){
        res.render('agregar-usuarios',{errors })
      }else{

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
}
        
})


rutas.post('/filtrar-usuarios',isAuthenticated, (req,res)=>{
    //FILTRAR POR NOMBRE/CORREO Y ROL
    usuario.find(
        {
           $or:[{nombre: new RegExp('^'+ req.body.filtrado + '$',"i")}, 
                {correo:   new RegExp('^'+ req.body.filtrado + '$',"i")},
                {correo: {$regex: req.body.filtrado, $options: "i"} },
                {nombre: {$regex: req.body.filtrado, $options: "i"} }]                        
        })

        .then(rpta =>{
            if(rpta == ''){
                res.redirect('/admin/consultar-usuarios')
            }
            else{
                res.render('listado-usuarios', {lusuarios: rpta})
            }            
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })    
})


//ORDENAR
rutas.post('/ordenar-usuarios',isAuthenticated, (req,res) =>{
    
    if(req.body.tipoOrdenado == "Admin"){
            usuario.find(
            {
               rol: 'Admin'
                
            })
            .then(rpta => {
                
                res.render('listado-usuarios', {lusuarios: rpta })
                
            })            
    }   
    else if(req.body.tipoOrdenado == "Organizador"){
        usuario.find(
            {
               rol: 'Organizador'
                
            })
            .then(rpta => {
                
                res.render('listado-usuarios', {lusuarios: rpta })
                
            })
    }    
    else if(req.body.tipoOrdenado == "Participante Líder"){
        usuario.find(
            {
               rol: 'Participante Líder'
                
            })
            .then(rpta => {
                
                res.render('listado-usuarios', {lusuarios: rpta })
                
            })
    }
    else{
        usuario.find({})
        .then(rpta => {            
            res.redirect('/admin/consultar-usuarios')                 
        })        
    }       
})

var uu=[]
rutas.get('/editar-usuario',isAuthenticated, (req,res)=>{
    //ABRIR PAGINA EDITAR
    //ESCRIBIR LOS DATOS A EDITAR
    let errors = [];
    
    usuario.find(
        {
            _id: req.query.id            
        })
        .then(rpta=>{
            uu=rpta
            console.log(rpta)            
            res.render('editar-usuarios',{errors,usuarios: uu})
        })
        
})

rutas.post('/editar-usuario',isAuthenticated,async (req,res)=>{
    //ENVIAR DATOS DE USUARIO EDITADO
    //CONFIRMAR QUE CORREO NO ESTE REGISTRADO PREVIAMENTE
    //mostrar mensaje de error en todo caso (no pop up)
    //res.redirect a listado de usuarios
    const anti = req.body.anti
    let errors = [];
    

    if(anti != req.body.correo){

        const usuariocorreo = await usuario.findOne({correo:req.body.correo}) 
        if(usuariocorreo){ //si se encuentra usuario
        errors.push({text: 'Correo ya registrado.'});
        }
        
    } 

    if (errors.length>0){
        res.render('editar-usuarios',{errors,usuarios: uu })
      }else{

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
            res.redirect('consultar-usuarios/1')
    })
}
})





module.exports =rutas