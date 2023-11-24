const mongoose = require('mongoose');

const historialLaboralSchema = new mongoose.Schema({
  Empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true // Hacer el campo Empleado requerido
  },
  FechaInicio: {
    type: Date,
    required: true // Hacer el campo FechaInicio requerido
  },
  FechaFinalizacion: {
    type: Date
  },
  PuestoTrabajo: {
    type: String,
    required: true // Hacer el campo PuestoTrabajo requerido
  },
  DescripcionFunciones: {
    type: String,
    required: true // Hacer el campo DescripcionFunciones requerido
  },
  NombreEmpresaAnterior: {
    type: String,
  },
  MotivoSalida: {
    type: String
  }
});

const HistorialLaboral = mongoose.model('HistorialLaboral', historialLaboralSchema);

module.exports = HistorialLaboral;
