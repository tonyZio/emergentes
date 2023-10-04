const express = require('express');
const router = express.Router();
const evaluacionDesempenoController = require('../controllers/evaluaciones');

router
    .route('/')
    .post(evaluacionDesempenoController.createEvaluacionDesempeno)
    .get(evaluacionDesempenoController.getAllEvaluacionesDesempeno);

router
    .route('/:id')
    .get(evaluacionDesempenoController.getEvaluacionDesempenoById)
    .put(evaluacionDesempenoController.updateEvaluacionDesempeno)
    .delete(evaluacionDesempenoController.deleteEvaluacionDesempeno);

module.exports = router;