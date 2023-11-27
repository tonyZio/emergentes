const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    required: true, // Hacer el campo Nombre requerido
  },
  Apellido: {
    type: String,
    required: true, // Hacer el campo Apellido requerido
  },
  FechaNacimiento: {
    type: Date,
    required: true, // Hacer el campo FechaNacimiento requerido
  },
  Genero: {
    type: String,
    required: true, // Hacer el campo Genero requerido
  },
  Direccion: {
    type: String,
    required: true, // Hacer el campo Direccion requerido
  },
  Telefono: {
    type: String,
    required: true, // Hacer el campo Telefono requerido
  },
  CorreoElectronico: {
    type: String,
    required: true, // Hacer el campo CorreoElectronico requerido
  },
  FechaContratacion: {
    type: Date,
    required: true, // Hacer el campo FechaContratacion requerido
  },
  Salario: {
    type: Number,
    required: true, // Hacer el campo Salario requerido
  },
  NombreDepartamento: {
    type: String,
    required: true, // Hacer el campo NombreDepartamento requerido
  },
  Departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departamento",
    required: true, // Hacer el campo Departamento requerido
  },
  NombreSupervisor: {
    type: String,
  },
  Supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
  },
  PuestoTrabajo: {
    type: String,
    required: true, // Hacer el campo PuestoTrabajo requerido
  },
  NumeroSeguroSocial: {
    type: String,
    required: true, // Hacer el campo NumeroSeguroSocial requerido
  },
  EsSupervisor: {
    type: Boolean,
    required: true,
  },
});

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
