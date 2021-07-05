
/*
const mongoose = require('mongoose');

const user= 'eldrickop';
const password = 'eldrickop';
const dbname = 'torneo';
const uri=`mongodb+srv://${user}:${password}@cluster0.6dovc.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(()=>console.log('base de datos mongo conectada'))
    .catch(e=> console.log(e));


    

    const usuario = mongoose.model('Usuario', {
        nombre:  String,
        correo: String,
        password: String,
        rol:String,
        equipo:String
      });

    const aduno = new usuario({ nombre:  'eldrick',correo: 'eldrickeldrick@gmailcom',password: 'String',rol:'admin' });
    aduno.save().then(() => console.log('op'));

    */