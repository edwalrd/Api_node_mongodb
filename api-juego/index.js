'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_juego', {useNewUrlParser: true})
.then(()=>{

    console.log("conexion esta bien de bien");

    app.listen(port , ()=>{

   console.log('servidor corriendo en http://localhost:' + port);

    });
    
});