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
const logeados = require('./routes/login'); //rutas para los usuarios logeados
const fixt = require('./routes/fixture');
const posi = require('./routes/posiciones');
const torneo = require('./routes/torneo');
app.use('/' , logeados); 
/*app.use('/' , fixt); 
app.use('/' , posi); 
app.use('/' , torneo);
mamabicho */

/* Archivos estaticos */
app.use(express.static(__dirname + "/public"))

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


