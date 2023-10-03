const mongoose = require('mongoose');
const Departamento = require('../models/Departamento');

mongoose.connect('mongodb://127.0.0.1:27017/gestionempleados');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida correctamente.');
});


const nuevoDepartamento = new Empleado({
    NombreDepartamento: 'Ventas',
    DescripciónDepartamento: 'Venden cosas y asi',
});
  
nuevoDepartamento.save()
    .then(() => {
      console.log('Departamento guardado correctamente.');
    })
    .catch((err) => {
      console.error('Error al guardar el departamento:', err);
    });
  
Departamento.find({})
    .then((departamentos) => {
      console.log('Departamentos encontrados:', departamentos);
    })
    .catch((err) => {
      console.error('Error al buscar departamentos:', err);
    });
  
const departamentoIdActualizar = '';
  
Departamento.findByIdAndUpdate(
    departamentoIdActualizar,
    { NombreDepartamento: "Ventas de piso" },
    { DescripciónDepartamento: "Ventas pero de piso" }, 
    { new: true }// Devuelve el departamento actualizado
    )
    .then((departamentoActualizado) => {
      console.log('Departamento actualizado:', departamentoActualizado);
    })
    .catch((err) => {
      console.error('Error al actualizar departamento:', err);
    });
  
const departamentoIdEliminar = '';
  
Departamento.findByIdAndRemove(departamentoIdEliminar)
    .then(() => {
      console.log('Departamento eliminado correctamente.');
    })
    .catch((err) => {
      console.error('Error al eliminar departamento:', err);
    });
  