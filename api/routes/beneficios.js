const express = require('express');
const router = express.Router();
const beneficioController = require('../controllers/beneficios');
const {verifyToken} = require('../middleware');
const {validateBeneficios} = require('../middleware');
const catchAsync = require('../utils/catchAsync');


router
    .route('/')
    .post(verifyToken,validateBeneficios,catchAsync(beneficioController.createBeneficio))
    .get(verifyToken,catchAsync(beneficioController.getAllBeneficios));

router
    .route('/:id')
    .get(verifyToken,catchAsync(beneficioController.getBeneficioById))
    .put(verifyToken,validateBeneficios,catchAsync(beneficioController.updateBeneficio))
    .delete(verifyToken,catchAsync(beneficioController.deleteBeneficio));

module.exports = router;