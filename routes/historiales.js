const express = require('express');
const router = express.Router();
const historialLaboralController = require('../controllers/historiales');
const {verifyToken} = require('../middleware');
const {validateHistorialLaboral} = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router
  .route('/')
  .post(verifyToken,validateHistorialLaboral, catchAsync(historialLaboralController.createHistorialLaboral))
  .get(verifyToken,catchAsync(historialLaboralController.getAllHistorialesLaborales));

router
  .route('/:id')
  .get(verifyToken,catchAsync(historialLaboralController.getHistorialLaboralById))
  .put(verifyToken,validateHistorialLaboral,catchAsync(historialLaboralController.updateHistorialLaboral))
  .delete(verifyToken,validateHistorialLaboral,catchAsync(historialLaboralController.deleteHistorialLaboral));

module.exports = router;