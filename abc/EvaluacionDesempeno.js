const mongoose = require('mongoose');
const EvaluacionDesempeno = require('../models/EvaluacionDesempeno');
const HistorialLaboral = require('../models/HistorialLaboral');
const  hoy = new Date();
mongoose.connect('mongodb://127.0.0.1:27017/gestionempleados');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida correctamente.');
});

  const nuevoHistorialLaboral = new Empleado({
    PuestoTrabajo: 'Ventas',
    DescripciónFunciones: 'Vende paracetamol',
    NombreEmpresaAnterior: 'Similares',
    MotivoSalida: 'Quiere ser cantante'
});
  
nuevoHistorialLaboral.save()
    .then(() => {
      console.log('Historial laboral guardado correctamente.');
    })
    .catch((err) => {
      console.error('Error al guardar el historial laboral:', err);
    });
  
HistorialLaboral.find({})
    .then((historialesLaborales) => {
      console.log('Historiales laborales encontrados:', historialesLaborales);
    })
    .catch((err) => {
      console.error('Error al buscar historiales laborales:', err);
    });
  
const historialLaboraIdAztualizado = '';
  
EvaluacionDesempeno.findByIdAndUpdate(
    historialLaboraIdAztualizado,
    { PuestoTrabajo: 'Ex cantante' },
    { DescripciónFunciones: 'Cantaba' },
    { NombreEmpresaAnterior: 'El bar' }, 
    { MotivoSalida: 'No canta'},
    { new: true }// Devuelve el historial laboral actualizado.
    )
    .then((historialActualizado) => {
      console.log('Historial laboral actualizado:', historialActualizado);
    })
    .catch((err) => {
      console.error('Error al actualizar historial laboral:', err);
    });
  
const historialLaboralIdEliminar = '';
  
EvaluacionDesempeno.findByIdAndRemove(historialLaboralIdEliminar)
    .then(() => {
      console.log('Historial laboral eliminado correctamente.');
    })
    .catch((err) => {
      console.error('Error al eliminar historial laboral:', err);
    });
  