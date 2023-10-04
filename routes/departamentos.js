const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentos');

router
    .route('/')
    .post(departamentoController.createDepartamento)
    .get(departamentoController.getAllDepartamentos);

router
    .route('/:id')
    .get(departamentoController.getDepartamentoById)
    .put(departamentoController.updateDepartamento)
    .delete(departamentoController.deleteDepartamento);

module.exports = router;
