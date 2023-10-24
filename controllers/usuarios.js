const jwt = require('jsonwebtoken');

const User = require('../models/Usuario'); // Importa el modelo de usuario
const secretKey = 'secreto';

const registro = async (req, res) => {
  const { nombreUsuario, contrasenia } = req.body;
  if (!nombreUsuario || !contrasenia) {
    res.status(400).json({ mensaje: 'Por favor, proporcione todos los campos requeridos.' });
    return;
  }

  try {
    const usuarioExistente = await User.findOne({ nombreUsuario });
    if (usuarioExistente) {
      res.status(400).json({ mensaje: 'El usuario ya existe.' });
      return;
    }

    const usuario = new User({ nombreUsuario, contrasenia });
    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

const login = async (req, res) => {
    const { nombreUsuario, contrasenia } = req.body;
    if (!nombreUsuario || !contrasenia) {
      res.status(400).json({ mensaje: 'Por favor, proporcione todos los campos requeridos.' });
      return;
    }
  
    try {
      const usuario = await User.findOne({ nombreUsuario });
      if (!usuario) {
        res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
        return;
      }
  
      // Compara la contraseña ingresada con la contraseña almacenada utilizando bcrypt.compare
      const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
      if (!contraseniaValida) {
        res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
        return;
      }
  
      // Si las credenciales son válidas, genera un token JWT
      const token = jwt.sign({ nombreUsuario: usuario.nombreUsuario }, secretKey);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor.' });
    }
};
// Crear un usuario
const createUsuario = async (req, res) => {
    const { nombreUsuario, contrasenia } = req.body;
    if (!nombreUsuario || !contrasenia) {
      res.status(400).json({ mensaje: 'Por favor, proporcione todos los campos requeridos.' });
      return;
    }
  
    try {
      const usuarioExistente = await User.findOne({ nombreUsuario });
      if (usuarioExistente) {
        res.status(400).json({ mensaje: 'El usuario ya existe.' });
        return;
      }
  
      const usuario = new User({ nombreUsuario, contrasenia });
      await usuario.save();
      res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor.' });
    }
};
  
// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
try {
    const usuarios = await User.find();
    res.json(usuarios);
} catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
}
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;

    try {
        const usuario = await User.findById(usuarioId);
        if (!usuario) {
        res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        return;
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor.' });
    }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
const usuarioId = req.params.id;
const { nombreUsuario, contrasenia } = req.body;

try {
    const usuario = await User.findById(usuarioId);
    if (!usuario) {
    res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    return;
    }

    usuario.nombreUsuario = nombreUsuario || usuario.nombreUsuario;
    usuario.contrasenia = contrasenia || usuario.contrasenia;

    await usuario.save();
    res.json({ mensaje: 'Usuario actualizado con éxito.' });
} catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
}
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
const usuarioId = req.params.id;

try {
    const usuario = await User.findById(usuarioId);
    if (!usuario) {
    res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    return;
    }

    await usuario.remove();
    res.json({ mensaje: 'Usuario eliminado con éxito.' });
} catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
}
};


module.exports = {
  registro,
  login,
  createUsuario,
  deleteUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario
};