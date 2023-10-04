const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleados');

router
    .route('/')
    .post(empleadoController.createEmpleado)
    .get(empleadoController.getAllEmpleados)

router
    .route('/:id')
    .get(empleadoController.getEmpleadoById)
    .put(empleadoController.updateEmpleado)
    .delete(empleadoController.deleteEmpleado);
  
module.exports = router;