const express = require('express');
const router = express.Router();
const historialLaboralController = require('../controllers/historiales');

router
  .route('/')
  .post(historialLaboralController.createHistorialLaboral)
  .get(historialLaboralController.getAllHistorialesLaborales);

router
  .route('/:id')
  .get(historialLaboralController.getHistorialLaboralById)
  .put(historialLaboralController.updateHistorialLaboral)
  .delete(historialLaboralController.deleteHistorialLaboral);

module.exports = router;