const express = require('express');
const router = express.Router();
const evaluacionDesempenoController = require('../controllers/evaluaciones');
const {verifyToken} = require('../middleware');
const {validateEvaluacionDesempeno} = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router
    .route('/')
    .post(verifyToken,validateEvaluacionDesempeno,catchAsync(evaluacionDesempenoController.createEvaluacionDesempeno))
    .get(verifyToken,catchAsync(evaluacionDesempenoController.getAllEvaluacionesDesempeno));

router
    .route('/:id')
    .get(verifyToken,catchAsync(evaluacionDesempenoController.getEvaluacionDesempenoById))
    .put(verifyToken,validateEvaluacionDesempeno,catchAsync(evaluacionDesempenoController.updateEvaluacionDesempeno))
    .delete(verifyToken,validateEvaluacionDesempeno,catchAsync(evaluacionDesempenoController.deleteEvaluacionDesempeno));

module.exports = router;