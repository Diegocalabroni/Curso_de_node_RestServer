const mongoose = require('mongoose');

const connectionDB = async() => {


    try {

        await mongoose.connect( process.env.MONGO_CNN //, {
            //useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
       // }
        )

        console.log('Base de datos Online')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar la base de datos')
        
    }

}



module.exports = {
    connectionDB
}