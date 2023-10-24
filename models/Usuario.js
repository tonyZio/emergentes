const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    }
});

// Antes de guardar el usuario en la base de datos, hasheamos la contraseña
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(this.contrasenia, 10);
        this.contrasenia = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
