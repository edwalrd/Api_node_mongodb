'use strict'

var validacion = require('validator');
var Juegos = require('../modelos/juegos');
var fs = require('fs');

var controladorJuego = {

    saludo: (req, res) => {

        return res.status(200).send({

            mensaje: "bien"
        });
    },

    guardar: (req, res) => {

        var params = req.body;

        try {
            var validacionnombre = !validacion.isEmpty(params.nombre);
            var validacionprecio = !validacion.isEmpty(params.precio);
            var validacionplataforma = !validacion.isEmpty(params.plataforma);
        } catch (error) {

            return res.status(404).send({

                mensaje: "faltan datos por enviar..."
            });

        }


        if (validacionnombre && validacionprecio && validacionplataforma == true) {


            var juego = new Juegos();

            juego.nombre = params.nombre;
            juego.precio = params.precio;
            juego.estado = params.estado;
            juego.ano = params.ano;
            juego.categoria = params.categoria;
            juego.descripcion = params.descripcion;
            juego.plataforma = params.plataforma;
            juego.imagen.imagen1 = null;
            juego.imagen.imagen2 = null;
            juego.imagen.imagen3 = null;


            juego.save((err, juegoGuardado) => {

                if (err || !juegoGuardado) {

                    return res.status(200).send({

                        mensaje: "Se ha producido un error al guardar el video juego"
                    });

                } else {

                    return res.status(200).send({
                        status: "successes",
                        juegoGuardado
                    });
                }

            });

        }

    },

    ver_todo: (req, res) => {

        Juegos.find({}).exec((err, todojuego) => {


            if (err) {

                return res.status(400).send({
                    mensaje: "se ha producido un error"
                });
            }

            if (todojuego == false) {

                return res.status(200).send({
                    mensaje: "no hay videojuegos por mostrar"
                });
            }

            else {

                return res.status(200).send({
                    status: "successes",
                    todojuego
                });
            }

        });


    },

    ver_uno: (req, res) => {

        var juego_id = req.params.id;

        if (!juego_id || juego_id == null) {

            return res.status(400).send({

                status: "error",
                mensaje: 'No existe este juego'

            });
        } else {

            Juegos.findById(juego_id, (err, uno_juego) => {

                if (err || !uno_juego) {

                    return res.status(404).send({

                        mensaje: 'error no se encontro el Juego'
                    });
                }
                return res.status(200).send({

                    status: 'success',
                    uno_juego
                });

            });

        }

    },

    eliminar: (req, res) => {

        var juegoID = req.params.id;


        Juegos.findOneAndDelete({ _id: juegoID }, (err, juegoeliminado) => {

            if (err || !juegoeliminado) {

                return res.status(400).send({
                    mensaje: " ese juego no existe "
                });

            }
            return res.status(200).send({
                juegoeliminado
            });
        });


    },

    modificar: (req, res) => {

        var juegoID = req.params.id;

        var params = req.body;

        try {

            var validacionnombre = !validacion.isEmpty(params.nombre);
            var validacionprecio = !validacion.isEmpty(params.precio);
            var validacionplataforma = !validacion.isEmpty(params.plataforma);

        } catch (error) {

            return res.status(400).send({

                mensaje: "faltan datos por enviar"
            });
        }

        if (validacionnombre && validacionprecio && validacionplataforma == true) {

            Juegos.findOneAndUpdate({ _id: juegoID }, params, { new: true }, (err, juegoactualizado) => {

                if (err || !juegoactualizado) {

                    return res.status(400).send({

                        status: 'error',
                        mesanje: 'Error al actualizar'
                    });
                } else {
                    return res.status(200).send({

                        juegoactualizado
                    });

                }

            });
        } else {
            return res.status(400).send({


                status: 'error',
                mesanje: 'La validación no es correcta'
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
        ////////////////////

        var nombre_path = req.files.file0.path;
        var nombre_path_1 = req.files.file1.path;
        var nombre_path_2 = req.files.file2.path;

        ///////////////////////

        var separar = nombre_path.split('\\');
        var separar_1 = nombre_path_1.split('\\');
        var separar_2 = nombre_path_2.split('\\');

        ///////////////////////

        var nombre_foto = separar[2];
        var nombre_foto_1 = separar_1[2];
        var nombre_foto2 = separar_2[2];

        ///////////////////////

        var separar_extencion = nombre_foto.split('\.');
        var separar_extencion_1 = nombre_foto_1.split('\.');
        var separar_extencion_2 = nombre_foto2.split('\.');

        ///////////////////////

        var extencion = separar_extencion[1];
        var extencion_1 = separar_extencion_1[1];
        var extencion_2 = separar_extencion_2[1];

        //

        if (extencion && extencion_1 && extencion_2 != 'png' && extencion && extencion_1 && extencion_2 != 'jpg' && extencion && extencion_1 && extencion_2 != 'jpeg' && extencion && extencion_1 && extencion_2 != 'gif') {

            fs.unlink(nombre_path, nombre_path_1, nombre_path_2, (err) => {

                return res.status(402).send({
                    status: 'error',
                    mensaje: 'la extension de la imagen no es valida'

                });
            });
        } else {

            var juegoID = req.params.id;


            if (juegoID) {


                Juegos.findOneAndUpdate({ _id: juegoID }, { "imagen.imagen1": nombre_foto, "imagen.imagen2": nombre_foto_1, "imagen.imagen3": nombre_foto2 }, { new: true }, (err, imagen_subidas) => {

                    if (err || !imagen_subidas) {

                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen del juego !!!'

                        });
                    } else {
                        return res.status(200).send({
                            status: 'successes',
                            juego: imagen_subidas

                        });

                    }

                });
            } else {

                return res.status(400).send({
                    status: 'error',
                    mesanje: "no se encuentrar este juego"
                });
            }

        }

    },

    busqueda: (req, res) => {

        var buscar = req.params.buscar;

        if (buscar == null) {

            Juegos.find({}).exec((err, busquedad) => {

                if (err) {

                    return res.status(400).send({

                        status: "error",
                        mesanje: "se ha producido un error"
                    });
                }

                return res.status(200).send({
                    status: 'successes',
                    busquedad
                });
            });


        } else {

            Juegos.find({

                $or: [{ "nombre": { "$regex": buscar, "$options": "i" } },
                { "plataforma": { "$regex": buscar, "$options": "i" } },
                { "categoria": { "$regex": buscar, "$options": "i" } },
                ]
            }).exec((err, busquedad) => {

                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'Error en la petición !!!'
                    });
                }

                if (!busquedad || busquedad.length <= 0) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'No hay juego que coincidan con tu busqueda !!!'
                    });
                } else {

                    return res.status(200).send({
                        status: 'successes',
                        busquedad
                    });
                }
            });
        }


    }
}




module.exports = controladorJuego;