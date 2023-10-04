const express = require('express');
const mongoose = require('mongoose');
const empleadoRoutes = require('../routes/evaluaciones');

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
app.use('/api/evaluaciones', empleadoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Demostración de los métodos CRUD

// 1. Crear una nueva evaluación de desempeño
const nuevaEvaluacionData = {
    Empleado: 'ID_DEL_EMPLEADO', // Reemplaza 'ID_DEL_EMPLEADO' con un ID válido de un empleado existente
    FechaEvaluación: new Date(),
    Calificación: 4.5,
    ComentariosObservaciones: 'Buen desempeño en general',
    Evaluador: 'ID_DEL_EMPLEADO', // Reemplaza 'ID_DEL_EMPLEADO' con un ID válido de un empleado que actúa como evaluador
  };
  
  const crearNuevaEvaluacion = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/evaluaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaEvaluacionData),
      });
  
      const nuevaEvaluacion = await response.json();
      console.log('Nueva evaluación de desempeño creada:', nuevaEvaluacion);
    } catch (error) {
      console.error('Error al crear una nueva evaluación de desempeño:', error);
    }
  };
  
  // 2. Obtener todas las evaluaciones de desempeño
  const obtenerTodasLasEvaluaciones = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/evaluaciones');
      const evaluaciones = await response.json();
      console.log('Todas las evaluaciones de desempeño:', evaluaciones);
    } catch (error) {
      console.error('Error al obtener todas las evaluaciones de desempeño:', error);
    }
  };
  
  // 3. Obtener una evaluación de desempeño por ID (reemplaza 'ID_DE_LA_EVALUACION' con un ID válido)
  const obtenerEvaluacionPorId = async (evaluacionId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/evaluaciones/${evaluacionId}`);
      const evaluacion = await response.json();
      console.log('Evaluación de desempeño por ID:', evaluacion);
    } catch (error) {
      console.error('Error al obtener la evaluación de desempeño por ID:', error);
    }
  };
  
  // 4. Actualizar una evaluación de desempeño por ID (reemplaza 'ID_DE_LA_EVALUACION' con un ID válido)
  const actualizarEvaluacionPorId = async (evaluacionId, newData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/evaluaciones/${evaluacionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      const evaluacionActualizada = await response.json();
      console.log('Evaluación de desempeño actualizada:', evaluacionActualizada);
    } catch (error) {
      console.error('Error al actualizar la evaluación de desempeño:', error);
    }
  };
  
  // 5. Eliminar una evaluación de desempeño por ID (reemplaza 'ID_DE_LA_EVALUACION' con un ID válido)
  const eliminarEvaluacionPorId = async (evaluacionId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/evaluaciones/${evaluacionId}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        console.log('Evaluación de desempeño eliminada con éxito');
      } else {
        console.error('Error al eliminar la evaluación de desempeño');
      }
    } catch (error) {
      console.error('Error al eliminar la evaluación de desempeño:', error);
    }
  };
  
  // Ejecutar las funciones de demostración
  crearNuevaEvaluacion();
  obtenerTodasLasEvaluaciones();
  //obtenerEvaluacionPorId('ID_DE_LA_EVALUACION');
  //actualizarEvaluacionPorId('ID_DE_LA_EVALUACION', { Calificación: 4.8 });
  //eliminarEvaluacionPorId('ID_DE_LA_EVALUACION');