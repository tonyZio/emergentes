const mongoose = require('mongoose');

const evaluacionDesempenoSchema = new mongoose.Schema({
  Empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado' // Referencia al modelo Empleado
  },
  FechaEvaluación: Date,
  Calificación: Number,
  ComentariosObservaciones: String,
  Evaluador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado' // Referencia al modelo Empleado (evaluador)
  }
});

const EvaluacionDesempeno = mongoose.model('EvaluacionDesempeno', evaluacionDesempenoSchema);

module.exports = EvaluacionDesempeno;