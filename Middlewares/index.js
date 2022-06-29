

const validarCampos = require('../Middlewares/validar-campos');
const validarJWT  = require('../Middlewares/validar-jwt');
const  tieneRole  = require('../Middlewares/validar-role');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRole,
}