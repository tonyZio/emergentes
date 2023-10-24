const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentos');
const {verifyToken} = require('../middleware');
const {validateDepartamento} = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router
    .route('/')
    .post(verifyToken,validateDepartamento,catchAsync(departamentoController.createDepartamento))
    .get(verifyToken,catchAsync(departamentoController.getAllDepartamentos));

router
    .route('/:id')
    .get(verifyToken,catchAsync(departamentoController.getDepartamentoById))
    .put(verifyToken,validateDepartamento,catchAsync(departamentoController.updateDepartamento))
    .delete(verifyToken,validateDepartamento,catchAsync(departamentoController.deleteDepartamento));

module.exports = router;
