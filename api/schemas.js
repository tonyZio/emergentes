const Joi = require("joi");

// Esquema de validación para el modelo Beneficios
const beneficiosSchema = Joi.object({
  Empleado: Joi.string().required(),
  TipoBeneficio: Joi.string().required(),
  FechaInicio: Joi.date().required(),
  FechaFinalizacion: Joi.date().required(),
  DetallesBeneficio: Joi.string().required(),
});

// Esquema de validación para el modelo Departamento
const departamentoSchema = Joi.object({
  NombreDepartamento: Joi.string().required(),
  DescripcionDepartamento: Joi.string().required(),
  FechaCreacion: Joi.date().required(),
});

// Esquema de validación para el modelo Empleado
const empleadoSchema = Joi.object({
  Nombre: Joi.string().required(),
  Apellido: Joi.string().required(),
  FechaNacimiento: Joi.date().required(),
  Genero: Joi.string().required(),
  Direccion: Joi.string().required(),
  Telefono: Joi.string().required(),
  CorreoElectronico: Joi.string().required(),
  FechaContratacion: Joi.date().required(),
  Salario: Joi.number().required(),
  NombreDepartamento: Joi.string().required(),
  Departamento: Joi.string().required(),
  NombreSupervisor: Joi.string(),
  Supervisor: Joi.string(),
  PuestoTrabajo: Joi.string().required(),
  NumeroSeguroSocial: Joi.string().required(),
  EsSupervisor: Joi.boolean().required(),
});

// Esquema de validación para el modelo EvaluacionDesempeno
const evaluacionDesempenoSchema = Joi.object({
  Empleado: Joi.string().required(),
  FechaEvaluacion: Joi.date().required(),
  Calificacion: Joi.number().required(),
  ComentariosObservaciones: Joi.string().required(),
  Evaluador: Joi.string().required(),
});

// Esquema de validación para el modelo HistorialLaboral
const historialLaboralSchema = Joi.object({
  Empleado: Joi.string().required(),
  FechaInicio: Joi.date().required(),
  FechaFinalizacion: Joi.date(),
  PuestoTrabajo: Joi.string().required(),
  DescripcionFunciones: Joi.string().required(),
  NombreEmpresaAnterior: Joi.string(),
  MotivoSalida: Joi.string(),
});

const usuarioSchema = Joi.object({
  nombreUsuario: Joi.string().required(),
  contrasenia: Joi.string().required(),
});

module.exports = {
  beneficiosSchema,
  departamentoSchema,
  empleadoSchema,
  evaluacionDesempenoSchema,
  historialLaboralSchema,
  usuarioSchema,
};
