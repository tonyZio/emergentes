const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const usuarioSchema = new mongoose.Schema({
    nombreUsuario:{
        type: String,
        required: true,
        unique: true
    }
});


usuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', usuarioSchema);