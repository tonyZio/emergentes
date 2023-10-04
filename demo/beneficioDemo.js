const express = require('express');
const mongoose = require('mongoose');
const beneficioRoutes = require('../routes/beneficios'); // Importa las rutas de Beneficio en lugar de Empleado

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

// Usar las rutas de beneficios en lugar de empleados
app.use('/api/beneficios', beneficioRoutes); // Utiliza las rutas de beneficios en lugar de empleados

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Demostración de los métodos CRUD para Beneficios

// 1. Crear un nuevo beneficio
const nuevoBeneficioData = {
  Empleado: '6519ff4f7e50c76d4c5f1db7', // Reemplaza con un ID válido de empleado
  TipoBeneficio: 'Vacaciones',
  FechaInicio: new Date('2023-01-01'),
  FechaFinalización: new Date('2023-01-15'),
  DetallesBeneficio: 'Vacaciones de invierno',
};

const crearNuevoBeneficio = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/beneficios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoBeneficioData),
    });

    const nuevoBeneficio = await response.json();
    console.log('Nuevo beneficio creado:', nuevoBeneficio);
  } catch (error) {
    console.error('Error al crear un nuevo beneficio:', error);
  }
};

// 2. Obtener todos los beneficios
const obtenerTodosLosBeneficios = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/beneficios');
    const beneficios = await response.json();
    console.log('Todos los beneficios:', beneficios);
  } catch (error) {
    console.error('Error al obtener todos los beneficios:', error);
  }
};

// 3. Obtener un beneficio por ID (reemplaza 'ID_DEL_BENEFICIO' con un ID válido)
const obtenerBeneficioPorId = async (beneficioId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/beneficios/${beneficioId}`);
    const beneficio = await response.json();
    console.log('Beneficio por ID:', beneficio);
  } catch (error) {
    console.error('Error al obtener el beneficio por ID:', error);
  }
};

// 4. Actualizar un beneficio por ID (reemplaza 'ID_DEL_BENEFICIO' con un ID válido)
const actualizarBeneficioPorId = async (beneficioId, newData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/beneficios/${beneficioId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    const beneficioActualizado = await response.json();
    console.log('Beneficio actualizado:', beneficioActualizado);
  } catch (error) {
    console.error('Error al actualizar el beneficio:', error);
  }
};

// 5. Eliminar un beneficio por ID (reemplaza 'ID_DEL_BENEFICIO' con un ID válido)
const eliminarBeneficioPorId = async (beneficioId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/beneficios/${beneficioId}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      console.log('Beneficio eliminado con éxito');
    } else {
      console.error('Error al eliminar el beneficio');
    }
  } catch (error) {
    console.error('Error al eliminar el beneficio:', error);
  }
};

// Ejecutar las funciones de demostración
crearNuevoBeneficio();
obtenerTodosLosBeneficios();
//obtenerBeneficioPorId('ID_DEL_BENEFICIO');
//actualizarBeneficioPorId('ID_DEL_BENEFICIO', { TipoBeneficio: 'NuevoTipo' });
//eliminarBeneficioPorId('ID_DEL_BENEFICIO');