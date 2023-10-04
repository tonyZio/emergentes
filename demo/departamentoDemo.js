const express = require('express');
const mongoose = require('mongoose');
const departamentoRoutes = require('../routes/departamentos'); // Asegúrate de proporcionar la ruta correcta a las rutas de Departamento

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

// Usar las rutas de departamentos
app.use('/api/departamentos', departamentoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Demostración de los métodos CRUD para Departamento

// 1. Crear un nuevo departamento
const nuevoDepartamentoData = {
  NombreDepartamento: 'Ventas',
  DescripciónDepartamento: 'Departamento de ventas',
  FechaCreación: new Date(),
};

const crearNuevoDepartamento = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/departamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoDepartamentoData),
    });

    const nuevoDepartamento = await response.json();
    console.log('Nuevo departamento creado:', nuevoDepartamento);
  } catch (error) {
    console.error('Error al crear un nuevo departamento:', error);
  }
};

// 2. Obtener todos los departamentos
const obtenerTodosLosDepartamentos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/departamentos');
    const departamentos = await response.json();
    console.log('Todos los departamentos:', departamentos);
  } catch (error) {
    console.error('Error al obtener todos los departamentos:', error);
  }
};

// 3. Obtener un departamento por ID (reemplaza 'ID_DEL_DEPARTAMENTO' con un ID válido)
const obtenerDepartamentoPorId = async (departamentoId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/departamentos/${departamentoId}`);
    const departamento = await response.json();
    console.log('Departamento por ID:', departamento);
  } catch (error) {
    console.error('Error al obtener el departamento por ID:', error);
  }
};

// 4. Actualizar un departamento por ID (reemplaza 'ID_DEL_DEPARTAMENTO' con un ID válido)
const actualizarDepartamentoPorId = async (departamentoId, newData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/departamentos/${departamentoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    const departamentoActualizado = await response.json();
    console.log('Departamento actualizado:', departamentoActualizado);
  } catch (error) {
    console.error('Error al actualizar el departamento:', error);
  }
};

// 5. Eliminar un departamento por ID (reemplaza 'ID_DEL_DEPARTAMENTO' con un ID válido)
const eliminarDepartamentoPorId = async (departamentoId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/departamentos/${departamentoId}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      console.log('Departamento eliminado con éxito');
    } else {
      console.error('Error al eliminar el departamento');
    }
  } catch (error) {
    console.error('Error al eliminar el departamento:', error);
  }
};

// Ejecutar las funciones de demostración
crearNuevoDepartamento();
obtenerTodosLosDepartamentos();
//obtenerDepartamentoPorId('ID_DEL_DEPARTAMENTO');
//actualizarDepartamentoPorId('ID_DEL_DEPARTAMENTO', { NombreDepartamento: 'NuevoNombre' });
//eliminarDepartamentoPorId('ID_DEL_DEPARTAMENTO');