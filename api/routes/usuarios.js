const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios'); // Importa el controlador de usuarios
const { verifyToken } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const {validateUsuario} = require('../middleware')

// Ruta para crear un usuario
router.post('/', verifyToken ,validateUsuario,catchAsync(usuarioController.createUsuario));

// Ruta para obtener todos los usuarios
router.get('/', verifyToken, catchAsync(usuarioController.getAllUsuarios));

// Ruta para obtener un usuario por ID
router.get('/:id', verifyToken, catchAsync(usuarioController.getUsuarioById));

// Ruta para actualizar un usuario
router.put('/:id', verifyToken, validateUsuario,catchAsync(usuarioController.updateUsuario));

// Ruta para eliminar un usuario
router.delete('/:id', verifyToken, catchAsync(usuarioController.deleteUsuario));

module.exports = router;