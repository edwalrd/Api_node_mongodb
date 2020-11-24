'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var app = express();


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

var ruta_juego = require('./routas/ruta-juego');
var ruta_cliente= require('./routas/ruta-cliente');

app.use('/api', ruta_juego , ruta_cliente );

module.exports = app;