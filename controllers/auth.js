const { response, request } = require("express");
const bcryptjs = require("bcryptjs")

const Usuario = require('../Models/usuario')
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require("../helpers/google.verify");


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


const googleSignIn = async(req = request, res= response) => {

    const { id_token } = req.body

    try {

        const { nombre, img, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({correo});
        // console.log(usuario)

        if (!usuario) {
            // tengo que crearlo
            const data = {
                nombre,
                correo,
                img,
                password: ':p',
                google: true,
                rol: 'ADMIN_ROLE'
            };
        
            usuario = new Usuario(data);
            await usuario.save()
            // const token = await generarJWT( usuario.id)

            // return res.status(201).json({
            //     usuario,
            //     token
            // }) 
           
        }

        if ( !usuario.estado ){
            return  res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
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
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

 

  
}

module.exports = {
    login,
    googleSignIn
}