const mongoose = require('mongoose');

const evaluacionDesempenoSchema = new mongoose.Schema({
  Empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true // Hacer el campo Empleado requerido
  },
  FechaEvaluacion: {
    type: Date,
    required: true // Hacer el campo FechaEvaluacion requerido
  },
  Calificacion: {
    type: Number,
    required: true // Hacer el campo Calificacion requerido
  },
  ComentariosObservaciones: {
    type: String,
    required: true // Hacer el campo ComentariosObservaciones requerido
  },
  Evaluador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true // Hacer el campo Evaluador requerido
  }
});

const EvaluacionDesempeno = mongoose.model('EvaluacionDesempeno', evaluacionDesempenoSchema);

module.exports = EvaluacionDesempeno;
