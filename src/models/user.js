const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nombre :{
        type:String,
        require:true
    },
    edad:{
        type:Number,
        required:true
    },
    correo:{
        type:String,
        require:true
    },
    contrasenia:{
        type:String,
        require:true
    }
}
)

module.exports = mongoose.model('User', userSchema);
