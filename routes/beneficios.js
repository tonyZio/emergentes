const express = require('express');
const router = express.Router();
const beneficioController = require('../controllers/beneficios');
const {verifyToken} = require('../middleware');
const {validateBeneficios} = require('../middleware');
router
    .route('/')
    .post(verifyToken,validateBeneficios,beneficioController.createBeneficio)
    .get(verifyToken,beneficioController.getAllBeneficios);

router
    .route('/:id')
    .get(verifyToken,beneficioController.getBeneficioById)
    .put(verifyToken,validateBeneficios,beneficioController.updateBeneficio)
    .delete(verifyToken,validateBeneficios,beneficioController.deleteBeneficio);

module.exports = router;