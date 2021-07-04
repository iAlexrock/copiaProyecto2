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

// ingresar el mongodb

/*

por el momento esta ne app.js!!!!!

const mongoose = require('mongoose');

const user= 'eldrickop';
const password = 'eldrickop';
const dbname = 'veterinaira';
const uri=`mongodb+srv://${user}:${password}@cluster0.t4msq.mongodb.net/${dbname}?retryWrites=true&w=majority`;


mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(()=>console.log('base de datos mongo conectada'))
    .catch(e=> console.log(e));




*/

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
const logeados = require('./routes/SignUp'); //rutas para los usuarios logeados
//const fixt = require('./routes/fixture');
//const posi = require('./routes/posiciones');
//const torneo = require('./routes/torneo');
app.use('/sign-up' , logeados); 
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


