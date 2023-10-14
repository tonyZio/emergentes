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
app.use('/empleados', empleadoRoutes);

// Middleware para manejar rutas no válidas
app.use((req, res, next) => {
  const error = new Error('Ruta no válida');
  error.status = 404;
  next(error);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});