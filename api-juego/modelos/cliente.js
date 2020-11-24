'use strict'

var mongoose = require('mongoose');
const { schema } = require('./juegos');

var Schema = mongoose.Schema;

var cliente = Schema({

    nombre: String,
    apellido: String,
    direccion: String,
    password: String,
    telefono: {
        telefono1: String,
        telefono2: String
    },
    correo: String,
    foto: String
});

module.exports = mongoose.model('Cliente', cliente);