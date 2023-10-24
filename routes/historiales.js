const express = require('express');
const router = express.Router();
const historialLaboralController = require('../controllers/historiales');
const {verifyToken} = require('../middleware');
const {validateHistorialLaboral} = require('../middleware');

router
  .route('/')
  .post(verifyToken,historialLaboralController.createHistorialLaboral)
  .get(verifyToken,validateHistorialLaboral,historialLaboralController.getAllHistorialesLaborales);

router
  .route('/:id')
  .get(verifyToken,historialLaboralController.getHistorialLaboralById)
  .put(verifyToken,validateHistorialLaboral,historialLaboralController.updateHistorialLaboral)
  .delete(verifyToken,validateHistorialLaboral,historialLaboralController.deleteHistorialLaboral);

module.exports = router;