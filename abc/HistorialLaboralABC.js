const mongoose = require('mongoose');
const HistorialLaboral = require('../models/HistorialLaboral');
const  hoy = new Date();
mongoose.connect('mongodb://127.0.0.1:27017/gestionempleados');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida correctamente.');
});

  const nuevaEvaluacion = new Empleado({
  FechaEvaluación: hoy,
  Calificación: 5,
  ComentariosObservaciones: 'paso apenas',
});
  
nuevaEvaluacion.save()
    .then(() => {
      console.log('Evaluación guardada correctamente.');
    })
    .catch((err) => {
      console.error('Error al guardar la evaluación:', err);
    });
  
EvaluacionDesempeno.find({})
    .then((evaluaciones) => {
      console.log('Evaluacioness encontradas:', evaluaciones);
    })
    .catch((err) => {
      console.error('Error al buscar evaluaciones:', err);
    });
  
const evaluacionIdAztualizar = '';
  
EvaluacionDesempeno.findByIdAndUpdate(
    evaluacionIdAztualizar,
    { FechaEvaluación: "hoy" },
    { Calificación: "5" },
    { ComentariosObservaciones: "siempre no paso" }, 
    { new: true }// Devuelve la evaluación actualizada
    )
    .then((evaluacionActualizada) => {
      console.log('Evaluación actualizada:', evaluacionActualizada);
    })
    .catch((err) => {
      console.error('Error al actualizar evluación:', err);
    });
  
const evaluacionIdEliminar = '';
  
EvaluacionDesempeno.findByIdAndRemove(evaluacionIdEliminar)
    .then(() => {
      console.log('Evaluación eliminado correctamente.');
    })
    .catch((err) => {
      console.error('Error al eliminar evaluación:', err);
    });
  