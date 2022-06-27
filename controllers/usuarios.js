const { response, request} = require('express');
const bcryptjs = require('bcryptjs')


const Usuario = require('../Models/usuario')


const usuariosGet = async(req = request, res = response)=> {

     const {limite = 5, desde = 0} = req.query
    // const usuarios = await Usuario.find({estado: true})
    // .skip(desde)
    // .limit(limite)

    // const total = await Usuario.countDocuments({estado: true})

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}), //total
        Usuario.find({estado: true}) //usuarios
        .skip(desde)
        .limit(limite)
    ])

    //const {q, nombre='No name', apikey, page=1, limit} = req.query

    res.json({
        total,
       usuarios
    })
}

const usuariosPost = async( req, res = response ) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } )

    //verificar si el correo existe
   // const existeEmail = 

    //encriptar contraseña

    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(usuario.password, salt)
    
//guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async(req, res) => {

    const { id } = req.params

    const {_id, password, google, correo, ... resto } = req.body; //excluyo los datos que no quiero que se actualicen: {correo, google, password}

    if (password) {
        const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(resto.password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.json({
        msg: 'Put API - Controlador',
        usuario
    })
}

const usuariosDelete = async(req, res) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    // const BorrarUsuario = await Usuario.findByIdAndDelete(id) //borrar usuario de la base de datos. no recomendable
     res.json({
        usuario
    //   BorrarUsuario
     })
}








module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}