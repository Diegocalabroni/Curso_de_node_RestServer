const express = require('express');

const cors = require('cors');
const { connectionDB } = require('../Database/config');



class Server {
    constructor() {
        this.app = express()
        this.port = (process.env.PORT)
        this.usuariosPath = '/api/usuarios'

        //conectar a la base de datos
        this.conectarDB()

        //middlewares
        this.middleware()


        // Rutas de aplicacion
        this.routes()
    }

    async conectarDB() {
        await connectionDB()
    }

    middleware() {

        // CORS
        this.app.use(cors() )

        // Lectura y parseo del body

        this.app.use( express.json() )

        // Directorio publico
        this.app.use(express.static('Public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../Routes/usuarios'))
    } 
    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}






module.exports =   Server
