const express = require('express');
const mongoose = require('mongoose');
const historialRoutes = require('../routes/historiales');

const app = express();

// Conexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/gestionempleados');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida correctamente.');
});

// Middleware para el body parser
app.use(express.json());

// Usar las rutas de empleados
app.use('/api/historiales', historialRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Demostración de los métodos CRUD

const nuevoHistorialData = {
    Empleado: 'ID_DEL_EMPLEADO', // Reemplaza 'ID_DEL_EMPLEADO' con un ID válido de un empleado existente
    FechaInicio: new Date('2022-01-15'),
    FechaFinalización: new Date('2022-12-31'),
    PuestoTrabajo: 'Analista de Datos',
    DescripciónFunciones: 'Gestión y análisis de datos',
    NombreEmpresaAnterior: 'Empresa XYZ',
    MotivoSalida: 'Cambio de trabajo',
  };
  
  const crearNuevoHistorial = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/historiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoHistorialData),
      });
  
      const nuevoHistorial = await response.json();
      console.log('Nuevo historial laboral creado:', nuevoHistorial);
    } catch (error) {
      console.error('Error al crear un nuevo historial laboral:', error);
    }
  };
  
  // 2. Obtener todos los historiales laborales
  const obtenerTodosLosHistoriales = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/historiales');
      const historiales = await response.json();
      console.log('Todos los historiales laborales:', historiales);
    } catch (error) {
      console.error('Error al obtener todos los historiales laborales:', error);
    }
  };
  
  // 3. Obtener un historial laboral por ID (reemplaza 'ID_DEL_HISTORIAL' con un ID válido)
  const obtenerHistorialPorId = async (historialId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/historiales/${historialId}`);
      const historial = await response.json();
      console.log('Historial laboral por ID:', historial);
    } catch (error) {
      console.error('Error al obtener el historial laboral por ID:', error);
    }
  };
  
  // 4. Actualizar un historial laboral por ID (reemplaza 'ID_DEL_HISTORIAL' con un ID válido)
  const actualizarHistorialPorId = async (historialId, newData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/historiales/${historialId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      const historialActualizado = await response.json();
      console.log('Historial laboral actualizado:', historialActualizado);
    } catch (error) {
      console.error('Error al actualizar el historial laboral:', error);
    }
  };
  
  // 5. Eliminar un historial laboral por ID (reemplaza 'ID_DEL_HISTORIAL' con un ID válido)
  const eliminarHistorialPorId = async (historialId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/historiales/${historialId}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        console.log('Historial laboral eliminado con éxito');
      } else {
        console.error('Error al eliminar el historial laboral');
      }
    } catch (error) {
      console.error('Error al eliminar el historial laboral:', error);
    }
  };
  
  // Ejecutar las funciones de demostración
  crearNuevoHistorial();
  obtenerTodosLosHistoriales();
  //obtenerHistorialPorId('ID_DEL_HISTORIAL');
  //actualizarHistorialPorId('ID_DEL_HISTORIAL', { PuestoTrabajo: 'NuevoPuesto' });
  //eliminarHistorialPorId('ID_DEL_HISTORIAL');
  