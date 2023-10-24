const mongoose = require('mongoose');

const beneficiosSchema = new mongoose.Schema({
  Empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true // Hacer el campo Empleado requerido
  },
  TipoBeneficio: {
    type: String,
    required: true // Hacer el campo TipoBeneficio requerido
  },
  FechaInicio: {
    type: Date,
    required: true // Hacer el campo FechaInicio requerido
  },
  FechaFinalización: {
    type: Date,
    required: true // Hacer el campo FechaFinalización requerido
  },
  DetallesBeneficio: {
    type: String,
    required: true // Hacer el campo DetallesBeneficio requerido
  }
});

const Beneficios = mongoose.model('Beneficios', beneficiosSchema);

module.exports = Beneficios;
