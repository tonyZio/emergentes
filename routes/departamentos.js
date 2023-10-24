const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentos');
const {verifyToken} = require('../middleware');
const {validateDepartamento} = require('../middleware');

router
    .route('/')
    .post(verifyToken,departamentoController.createDepartamento)
    .get(verifyToken,validateDepartamento,departamentoController.getAllDepartamentos);

router
    .route('/:id')
    .get(verifyToken,departamentoController.getDepartamentoById)
    .put(verifyToken,validateDepartamento,departamentoController.updateDepartamento)
    .delete(verifyToken,validateDepartamento,departamentoController.deleteDepartamento);

module.exports = router;
