const express = require('express')
const http = require('http');
const morgan = require("morgan")

/* Uso de layout */
const expressEjsLayout = require('express-ejs-layouts')

const hostname = 'localhost';
const port = 3000;

/* CRear la app Express */
const app = express();

app.use(morgan('combined'))


//AGREGAR EJS
app.set('view engine','ejs');
app.set('layout', '../layouts/plantilla');
app.use(expressEjsLayout);

/* MAnejo de Sesion 
const session = require('express-session')
app.use(session ({
  secret : "misecreto",
  resave : false,
  saveUninitialized : false
}))*/

/* Uso de Rutas */

//mongo

const mongoose = require('mongoose');

const user= 'eldrickop';
const password = 'eldrickop';
const dbname = 'torneo';
const uri=`mongodb+srv://${user}:${password}@cluster0.6dovc.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(()=>console.log('base de datos mongo conectada'))
    .catch(e=> console.log(e));








const logeados = require('./routes/SignUp'); //rutas para los usuarios logeados
const ingreso = require('./routes/SignIn'); //rutas para iniciar sesion
const organizador = require('./routes/Organizador'); //rutas para iniciar sesion
const espectador = require('./routes/Espectador');


app.use('/sign-up' , logeados); //vanessa
app.use('/sign-in' , ingreso); //eldrick
app.use('/organizador' , organizador); 
app.use('/' , espectador); 

/*app.use('/' , fixt); 
app.use('/' , posi); 
app.use('/' , torneo);
ee
*/


/* Archivos estaticos */
app.use(express.static(__dirname + "/public"))

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


