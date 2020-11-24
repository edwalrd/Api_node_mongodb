'use strict'

var express = require('express');

var router = express.Router();

var controladorCliente = require('../controladores/cliente');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './foto/cliente'});


router.get('/cliente/saludo' , controladorCliente.saludo);
router.get('/cliente/ver_todo' , controladorCliente.ver_todo);
router.get('/cliente/busqueda/:buscar' , controladorCliente.busqueda);

router.post('/cliente/guardar' , controladorCliente.guardar);
router.delete('/cliente/eliminar/:id' , controladorCliente.eliminar);
router.put('/cliente/modificar/:id' , controladorCliente.modificar);

router.post('/cliente/guardar_fotos/:id', md_upload, controladorCliente.guardarfotos)




module.exports = router;