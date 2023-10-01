const mongoose = require('mongoose');

const beneficiosSchema = new mongoose.Schema({
  Empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado' // Referencia al modelo Empleado
  },
  TipoBeneficio: String,
  FechaInicio: Date,
  FechaFinalización: Date,
  DetallesBeneficio: String
});

const Beneficios = mongoose.model('Beneficios', beneficiosSchema);

module.exports = Beneficios;