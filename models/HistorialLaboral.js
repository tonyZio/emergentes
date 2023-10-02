const mongoose = require('mongoose');

const historialLaboralSchema = new mongoose.Schema({
  Empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado' // Referencia al modelo Empleado
  },
  FechaInicio: Date,
  FechaFinalización: Date,
  PuestoTrabajo: String,
  DescripciónFunciones: String,
  NombreEmpresaAnterior: String,
  MotivoSalida: String
});

const HistorialLaboral = mongoose.model('HistorialLaboral', historialLaboralSchema);

module.exports = HistorialLaboral;