const mongoose = require('mongoose');
const Empleado = require('../models/Empleado');

mongoose.connect('mongodb://127.0.0.1:27017/gestionempleados');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida correctamente.');
});


const nuevoEmpleado = new Empleado({
    Nombre: 'Juan',
    Apellido: 'Pérez'
});
  
nuevoEmpleado.save()
    .then(() => {
      console.log('Empleado guardado correctamente.');
    })
    .catch((err) => {
      console.error('Error al guardar el empleado:', err);
    });
  
Empleado.find({})
    .then((empleados) => {
      console.log('Empleados encontrados:', empleados);
    })
    .catch((err) => {
      console.error('Error al buscar empleados:', err);
    });
  
const empleadoIdActualizar = '';
  
Empleado.findByIdAndUpdate(
    empleadoIdActualizar,
    { Salario: 50000 },
    { new: true } // Devuelve el empleado actualizado
    )
    .then((empleadoActualizado) => {
      console.log('Empleado actualizado:', empleadoActualizado);
    })
    .catch((err) => {
      console.error('Error al actualizar empleado:', err);
    });
  
const empleadoIdEliminar = '';
  
Empleado.findByIdAndRemove(empleadoIdEliminar)
    .then(() => {
      console.log('Empleado eliminado correctamente.');
    })
    .catch((err) => {
      console.error('Error al eliminar empleado:', err);
    });
  