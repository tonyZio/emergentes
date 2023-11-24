const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  NombreDepartamento: {
    type: String,
    required: true // Hacer el campo NombreDepartamento requerido
  },
  DescripcionDepartamento: {
    type: String,
    required: true // Hacer el campo DescripciónDepartamento requerido
  },
  FechaCreacion: {
    type: Date,
    required: true // Hacer el campo FechaCreación requerido
  }
});

const Departamento = mongoose.model('Departamento', departamentoSchema);

module.exports = Departamento;

