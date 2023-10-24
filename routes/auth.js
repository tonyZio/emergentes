const express = require('express');
const router = express.Router();
const authController = require('../controllers/usuarios'); // Importa el controlador de autenticación

// Ruta de registro
router.post('/registro', authController.registro);

// Ruta de inicio de sesión
router.post('/login', authController.login);

module.exports = router