
const Role = require('../Models/role');
const Usuario = require('../Models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRole = await Role.findOne({ rol })
    if (!existeRole){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo) => {
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ) {
          throw new Error (`El correo: ${correo} ya existe`)
     }
}

const existeUsuarioPorId = async(id) =>{ 
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario) {
        throw new Error(`No existe usuario con ID: ${id}`)
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}