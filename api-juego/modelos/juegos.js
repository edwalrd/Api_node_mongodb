'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var juegos = Schema({

    nombre: String,
    precio: Number,
    estado: String,
    ano: Date,
    categoria: String,
    descripcion: String,
    plataforma: String , 
     imagen : {
        imagen1: String,
        imagen2: String,
        imagen3: String
    } 
});

module.exports = mongoose.model('Juegos',juegos);

