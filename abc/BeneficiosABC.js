const mongoose = require('mongoose');
const Beneficio = require('../models/Beneficio');

mongoose.connect('mongodb://127.0.0.1:27017/gestionempleados');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida correctamente.');
});


const nuevoBeneficio = new Beneficio({
    TipoBeneficio: 'Dental'
});
  
nuevoBeneficio.save()
    .then(() => {
      console.log('Beneficio guardado correctamente.');
    })
    .catch((err) => {
      console.error('Error al guardar el beneficio:', err);
    });
  
Beneficio.find({})
    .then((beneficios) => {
      console.log('Beneficios encontrados:', beneficios);
    })
    .catch((err) => {
      console.error('Error al buscar beneficios:', err);
    });
  
const empleadoIdActualizar = '';
  
Beneficio.findByIdAndUpdate(
    beneficioIdActualizar,
    { DetallesBeneficios: "Es aseguranza dental mi pa" },
    { new: true } // Devuelve el beneficio actualizado
    )
    .then((beneficioActualizado) => {
      console.log('Beneficio actualizado:', beneficioActualizado);
    })
    .catch((err) => {
      console.error('Error al actualizar beneficio:', err);
    });
  
const beneficioIdEliminar = '';
  
Beneficio.findByIdAndRemove(beneficioIdEliminar)
    .then(() => {
      console.log('Beneficio eliminado correctamente.');
    })
    .catch((err) => {
      console.error('Error al eliminar beneficio:', err);
    });
  