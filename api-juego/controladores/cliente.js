'use strict'

var validacion = require('validator');
var Cliente = require('../modelos/cliente');
var fs = require('fs');

var controladorCliente = {

    saludo: (req, res) => {

        return res.status(200).send({

            mensaje: "cliente bien"
        });
    },

    guardar: (req, res) => {

        var params = req.body;

        try {

            var validacion_nombre = !validacion.isEmpty(params.nombre);
            var validacion_correo = !validacion.isEmpty(params.correo);

        } catch (error) {

            return res.status(400).send({

                mensaje: "faltan datos por enviar..."
            });

        }
        if (validacion_correo && validacion_nombre == true) {


            var cliente = new Cliente();

            cliente.nombre = params.nombre;
            cliente.apellido = params.apellido;
            cliente.direccion = params.direccion;
            cliente.password = params.password;
            cliente.telefono.telefono1 = params.telefono1;
            cliente.telefono.telefono2 = params.telefono2;
            cliente.correo = params.correo;
            cliente.foto = null



            cliente.save((err, clienteguardado) => {

                if (err || !clienteguardado) {

                    return res.status(402).send({

                        mensaje: "sea producido un problema a registrar el usuario"
                    });

                } else {

                    return res.status(200).send({

                        status: 'successs',
                        mensaje: clienteguardado
                    });

                }


            });
        }

        else {

            return res.status(402).send({

                mensaje: "los datos no son validos"
            });
        }


    },

    ver_todo: (req, res) => {


        Cliente.find({}).exec((err, ver_todos) => {

            if (err) {

                return res.status(400).send({

                    mensaje: "Se ha producido un error"
                });

            } if (ver_todos == false) {

                return res.status(200).send({

                    mensaje: "no hay clientes por mostrar"
                });

            }
            return res.status(400).send({
                status: "successes",
                ver_todos
            });

        });

    },

    eliminar: (req, res) => {

        var clienteID = req.params.id;

        Cliente.findOneAndDelete({ _id: clienteID }, (err, clienteborrado) => {

            if (!clienteborrado || err) {

                return res.status(400).send({
                    mensaje: "este cliente no existe"
                });
            }
            else {

                return res.status(200).send({

                    clienteborrado
                });
            }
        });

    },

    modificar: (req, res) => {

        var clienteID = req.params.id;

        var params = req.body;

        try {

            var validacion_nombre = !validacion.isEmpty(params.nombre);
            var validacion_correo = !validacion.isEmpty(params.correo);

        } catch (error) {

            return res.status(400).send({

                mensaje: "faltan datos por enviar"
            });
        }

        if (validacion_nombre && validacion_correo == true) {


            Cliente.findOneAndUpdate({ _id: clienteID }, params, { new: true }, (err, clitenteactualizado) => {


                if (err || !clitenteactualizado) {

                    return res.status(400).send({
                        mensaje: "no se ha a encotrado este cliente"
                    });
                } else {

                    return res.status(200).send({

                        clitenteactualizado
                    });

                }

            });

        } else {

            return res.status(400).send({
                mensaje: "la validacion no es correcta"
            });
        }
    },

    guardarfotos: (req, res) => {


        if (!req.files) {

            return res.status(402).send({
                status: 'error',
                mensaje: "imagen no subida"

            });
        }

        var foto_path = req.files.file0.path;
        var separar = foto_path.split('\\');
        var foto = separar[2];
        var sacar_ext = foto.split('\.');
        var extencion = sacar_ext[1];


        if (extencion != "png" && extencion != "jpg" && extencion != "jpeg" && extencion != "gif") {

            fs.unlink(foto_path, (err) => {

                return res.status(402).send({
                    status: 'error',
                    mensaje: 'la extension de la imagen no es valida'

                });
            });

        } else {



            var clienteID = req.params.id;

            if (clienteID) {

                Cliente.findOneAndUpdate({ _id: clienteID }, { foto: foto }, { new: true }, (err, fotoactualizada) => {

                    if (err || !fotoactualizada) {

                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la foto del Cliente !!!'

                        });
                    } else {
                        return res.status(200).send({
                            status: 'success',
                            message: fotoactualizada

                        });

                    }
                });
            } else {

                return res.status(400).send({
                    status: 'error',
                    mesanje: "no se encuentrar este cliente"
                });
            }
        }


    },

    busqueda: (req, res) => {

        var buscar = req.params.buscar;


        if (buscar == null) {

            Cliente.find({

                $or: [{ "nombre": { "$regex": buscar, "$options": "i" } },
                { "apellido": { "$regex": buscar, "$options": "i" } }


                ]
            }).limit(20).exec((err, clientetodo) => {

                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'Error en la petición !!!'
                    });
                }

                if (!clientetodo || clientetodo.length <= 0) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'No hay cliente que coincidan con tu busqueda !!!'
                    });

                } else {

                    return res.status(200).send({

                        status: "successs",
                        clientetodo
                    });

                }

            });

        } else {

            Cliente.find({}).exec((err, clienteresultado) => {

                if (err || !clienteresultado) {


                    return res.status(200).send({

                        status: "error",
                        mensaje: ""
                    });
                } else {

                    return res.status(200).send({

                        status: "success",
                        clienteresultado
                    });
                }

            });

        }

    }


}

module.exports = controladorCliente;
