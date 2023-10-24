const express = require('express');
const router = express.Router();
const authController = require('../controllers/usuarios'); // Importa el controlador de autenticación
const catchAsync = require('../utils/catchAsync');

// Ruta de registro
router.post('/registro', catchAsync(authController.registro));

// Ruta de inicio de sesión
router.post('/login', catchAsync(authController.login));

module.exports = router