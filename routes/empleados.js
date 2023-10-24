const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleados');
const {verifyToken} = require('../middleware');
const {validateEmpleado} = require('../middleware');

router
    .route('/')
    .post(verifyToken,empleadoController.createEmpleado)
    .get(verifyToken,validateEmpleado,empleadoController.getAllEmpleados)

router
    .route('/:id')
    .get(verifyToken,empleadoController.getEmpleadoById)
    .put(verifyToken,validateEmpleado,empleadoController.updateEmpleado)
    .delete(verifyToken,validateEmpleado,empleadoController.deleteEmpleado);
  
module.exports = router;