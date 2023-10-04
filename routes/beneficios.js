const express = require('express');
const router = express.Router();
const beneficioController = require('../controllers/beneficios');

router
    .route('/')
    .post(beneficioController.createBeneficio)
    .get(beneficioController.getAllBeneficios);

router
    .route('/:id')
    .get(beneficioController.getBeneficioById)
    .put(beneficioController.updateBeneficio)
    .delete(beneficioController.deleteBeneficio);

module.exports = router;