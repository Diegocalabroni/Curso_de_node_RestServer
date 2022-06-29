const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosPost, usuariosGet, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const { emailExiste } = require('../helpers/db-validator');
const { existeUsuarioPorId } = require('../helpers/db-validator');
const { esRoleValido } = require('../helpers/db-validator');
const { validarCampos, validarJWT, tieneRole, esAdminRole } = require('../Middlewares/index');



//const { validarCampos } = require('../Middlewares/validar-campos');
//const { validarJWT } = require('../Middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../Middlewares/validar-role');


const router = Router();

router.get('/', usuariosGet )

router.post('/',[
    check('correo', 'El correo ingresado no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    //check('rol', 'El rol no es valido'). isIn(['ADMIN_ROLE', "USER_ROLE"]),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPost )

router.put('/:id',[
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
] , usuariosPut )

router.delete('/:id',[
    validarJWT,
   // esAdminRole,
   tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
], usuariosDelete )





module.exports = router;