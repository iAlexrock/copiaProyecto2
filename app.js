const mongoose = require('mongoose');

const user= 'eldrickop';
const password = 'eldrickop';
const dbname = 'torneo';
const uri=`mongodb+srv://${user}:${password}@cluster0.t4msq.mongodb.net/${dbname}?retryWrites=true&w=majority`;


mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(()=>console.log('base de datos mongo conectada'))
    .catch(e=> console.log(e));



/*
    const admin = mongoose.model('Administrador', {
        nombre:  String,
        correo: String,
        password: String
      });

    const aduno = new admin({ nombre:  'eldrick',correo: 'eldrickeldrick@gmailcom',password: 'String' });
    aduno.save().then(() => console.log('op'));

    */