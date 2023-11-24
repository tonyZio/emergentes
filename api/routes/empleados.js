const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleados');
const {verifyToken} = require('../middleware');
const {validateEmpleado} = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router
    .route('/')
    .post(verifyToken,validateEmpleado,catchAsync(empleadoController.createEmpleado))
    .get(verifyToken,catchAsync(empleadoController.getAllEmpleados));

router
    .route('/:id')
    .get(verifyToken,catchAsync(empleadoController.getEmpleadoById))
    .put(verifyToken,validateEmpleado,catchAsync(empleadoController.updateEmpleado))
    .delete(verifyToken,validateEmpleado,catchAsync(empleadoController.deleteEmpleado));
  
module.exports = router;