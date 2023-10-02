const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  Nombre: String,
  Apellido: String,
  FechaNacimiento: Date,
  Género: String,
  Dirección: String,
  Teléfono: String,
  CorreoElectrónico: String,
  FechaContratación: Date,
  Salario: Number,
  NombreDepartamento: String,
  Departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departamento' // Referencia al modelo Departamento
  },
  NombreSupervisor: String,
  Supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado' // Referencia al modelo Empleado (supervisor)
  },
  PuestoTrabajo: String,
  NúmeroSeguroSocial: String
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;