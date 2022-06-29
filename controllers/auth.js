const { response } = require("express");
const bcryptjs = require("bcryptjs")

const Usuario = require('../Models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')


const login = async(req, res = response) => {


    const { correo, password } = req.body

    try {

        //verificar que el correo existe

        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            res.status(400).json({
                msg: 'Usuario / password incorrecto - correo'
            })
        }
        //verificar que es usuario esté activo

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / password incorrecto - usuario: estado'
            })
        }

        //verificar que las contraseñas coincidan

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if ( !validPassword ) {
             return res.status(400).json({
                msg: 'Usuario / password incorrecto - Password'
             })
        }

        // generar el JWT

        const token = await generarJWT( usuario.id)


        res.json({
            usuario,
            token
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
        
    }

   
}

module.exports = {
    login,
}