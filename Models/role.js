
const { Schema, model} = require('mongoose');

const roleSchema = Schema ({

    rol: {
        type: String,
        required: [true, 'El rol no está registrao en la base de datos']
    }

})

module.exports = model('Role', roleSchema)