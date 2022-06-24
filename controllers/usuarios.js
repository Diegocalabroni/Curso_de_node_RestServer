const { response, request} = require('express');



const usuariosGet = (req = request, res = response)=> {

    const {q, nombre='No name', apikey, page=1, limit} = req.query

    res.json({
        msg: 'Get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = (req, res) => {

    const {nombre, edad, estadoCivil} = req.body;

    res.json({
        msg: 'Post API - Controlador',
        nombre,
        edad, 
        estadoCivil
    })
}

const usuariosPut = (req, res) => {

    const { id } = req.params
    res.json({
        msg: 'Put API - Controlador',
        id
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete API - Controlador'
    })
}








module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}