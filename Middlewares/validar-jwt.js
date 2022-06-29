const jwt = require('jsonwebtoken')
const { request, response } = require("express");

const Usuario = require('../Models/usuario')

const validarJWT = async(req = request, res = response, next ) => {

    const token = req.header('x-token');

   // console.log(token);

    if ( !token ) {
        res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
      
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY )


          //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if (! usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - No existe usuario en BD'
            })
            
        }

        // verificar si es uid tiene estado true
        if( !usuario.estado) {
           return res.status(401).json({
                msg: 'Token no valido - usuario con estado:false'
            })
        }

        req.usuario = usuario

        
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


   
}



module.exports = {
    validarJWT
}