const express = require('express');
const mongoose = require('mongoose');
const empleadoRoutes = require('../routes/empleados');

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
app.use('/api/empleados', empleadoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Demostración de los métodos CRUD

// 1. Crear un nuevo empleado
const nuevoEmpleadoData = {
  Nombre: 'Juan',
  Apellido: 'Pérez',
  FechaNacimiento: new Date('1990-05-15'),
  Género: 'Masculino',
  Dirección: 'Calle Principal 123',
  Teléfono: '555-123-4567',
  CorreoElectrónico: 'juan@example.com',
  FechaContratación: new Date('2021-01-10'),
  Salario: 50000,
  NombreDepartamento: 'Ventas',
  PuestoTrabajo: 'Vendedor',
  NúmeroSeguroSocial: '123-45-6789',
};

const crearNuevoEmpleado = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoEmpleadoData),
    });

    const nuevoEmpleado = await response.json();
    console.log('Nuevo empleado creado:', nuevoEmpleado);
  } catch (error) {
    console.error('Error al crear un nuevo empleado:', error);
  }
};

// 2. Obtener todos los empleados
const obtenerTodosLosEmpleados = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/empleados');
    const empleados = await response.json();
    console.log('Todos los empleados:', empleados);
  } catch (error) {
    console.error('Error al obtener todos los empleados:', error);
  }
};

// 3. Obtener un empleado por ID (reemplaza 'ID_DEL_EMPLEADO' con un ID válido)
const obtenerEmpleadoPorId = async (empleadoId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/empleados/${empleadoId}`);
    const empleado = await response.json();
    console.log('Empleado por ID:', empleado);
  } catch (error) {
    console.error('Error al obtener el empleado por ID:', error);
  }
};

// 4. Actualizar un empleado por ID (reemplaza 'ID_DEL_EMPLEADO' con un ID válido)
const actualizarEmpleadoPorId = async (empleadoId, newData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/empleados/${empleadoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    const empleadoActualizado = await response.json();
    console.log('Empleado actualizado:', empleadoActualizado);
  } catch (error) {
    console.error('Error al actualizar el empleado:', error);
  }
};

// 5. Eliminar un empleado por ID (reemplaza 'ID_DEL_EMPLEADO' con un ID válido)
const eliminarEmpleadoPorId = async (empleadoId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/empleados/${empleadoId}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      console.log('Empleado eliminado con éxito');
    } else {
      console.error('Error al eliminar el empleado');
    }
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
  }
};

// Ejecutar las funciones de demostración
crearNuevoEmpleado();
obtenerTodosLosEmpleados();
//obtenerEmpleadoPorId('ID_DEL_EMPLEADO');
//actualizarEmpleadoPorId('ID_DEL_EMPLEADO', { Nombre: 'NuevoNombre' });
//eliminarEmpleadoPorId('ID_DEL_EMPLEADO');