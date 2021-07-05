const express = require('express')
const http = require('http');
const morgan = require("morgan")
const flash = require('connect-flash');
const session = require('express-session')
const passport =require('passport');


/* Uso de layout */
const expressEjsLayout = require('express-ejs-layouts')

const hostname = 'localhost';
const port = 3000;

/* CRear la app Express */
const app = express();

require('./config/passport');

app.use(morgan('combined'))


//AGREGAR EJS
app.set('view engine','ejs');
app.set('layout', '../layouts/plantilla');
app.use(expressEjsLayout);



app.use(session ({
  secret : "misecreto",
  resave : false,
  saveUninitialized : false
}))

app.use(passport.initialize());
app.use(passport.session());

/* MAnejo de Sesion 
app.use(flash());

app.use((req,res,next)=>{
  res.locals.error = req.flash(error);
  next();
})


*/

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
const logeo = require('./routes/log');

app.use('/sign-up' , logeados); //vanessa
app.use('/sign-in' , ingreso); //eldrick
app.use('/log' , logeo); //eldrick

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


