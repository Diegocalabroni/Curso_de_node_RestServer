const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {

    return new Promise ( (resolve, reject) => {

        const payload = { uid }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '6h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('NO SE PUDO GENERAR EL JWT')
            }else{
                resolve( token )
            }
        })
    } )
}

module.exports = {
    generarJWT
}