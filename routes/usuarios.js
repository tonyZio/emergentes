const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); // Importa el controlador de usuarios
const { verifyToken } = require('../middleware');


// Ruta para crear un usuario
router.post('/usuarios', verifyToken ,usuarioController.createUsuario);

// Ruta para obtener todos los usuarios
router.get('/usuarios', verifyToken, usuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', verifyToken, usuarioController.getUsuarioById);

// Ruta para actualizar un usuario
router.put('/usuarios/:id', verifyToken, usuarioController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', verifyToken, usuarioController.deleteUsuario);

module.exports = router;