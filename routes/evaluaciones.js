const express = require('express');
const router = express.Router();
const evaluacionDesempenoController = require('../controllers/evaluaciones');
const {verifyToken} = require('../middleware');
const {validateEvaluacionDesempeno} = require('../middleware');

router
    .route('/')
    .post(verifyToken,evaluacionDesempenoController.createEvaluacionDesempeno)
    .get(verifyToken,validateEvaluacionDesempeno,evaluacionDesempenoController.getAllEvaluacionesDesempeno);

router
    .route('/:id')
    .get(verifyToken,evaluacionDesempenoController.getEvaluacionDesempenoById)
    .put(verifyToken,validateEvaluacionDesempeno,evaluacionDesempenoController.updateEvaluacionDesempeno)
    .delete(verifyToken,validateEvaluacionDesempeno,evaluacionDesempenoController.deleteEvaluacionDesempeno);

module.exports = router;