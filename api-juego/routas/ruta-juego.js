'use strict'

var express = require('express');

var router = express.Router();

var controladorJuego = require('../controladores/juego');

var multipart = require('connect-multiparty');

var md_upload = multipart({ uploadDir: './imagen/juegos'});


router.get('/juego/saludo' , controladorJuego.saludo);
router.get('/juego/ver_todo' , controladorJuego.ver_todo);
router.get('/juego/ver_uno/:id' , controladorJuego.ver_uno);
router.get('/juego/busqueda/:buscar?',controladorJuego.busqueda);

router.post('/juego/guardar' , controladorJuego.guardar);
router.post('/juego/guardar_fotos/:id' ,md_upload, controladorJuego.guardarfotos);

router.delete('/juego/eliminar/:id' , controladorJuego.eliminar);

router.put('/juego/modificar/:id' , controladorJuego.modificar);



module.exports = router;