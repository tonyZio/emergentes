const express = require("express");
const mongoose = require("mongoose");
const empleadoRoutes = require("./routes/empleados");
const authRoutes = require("./routes/auth");
const beneficiosRoutes = require("./routes/beneficios");
const departamentosRoutes = require("./routes/departamentos");
const evaluacionesRoutes = require("./routes/evaluaciones");
const historialesRoutes = require("./routes/historiales");
const usuariosRoutes = require("./routes/usuarios");
const ExpressError = require("./utils/expressError");
const cors = require("cors");

const app = express();

// Conexión a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/gestionempleados");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión a MongoDB establecida correctamente.");
});

// Middleware para el body parser
app.use(express.json());
app.use(cors());

// Usar las rutas
app.use("/empleados", empleadoRoutes);
app.use("/auth", authRoutes);
app.use("/beneficios", beneficiosRoutes);
app.use("/departamentos", departamentosRoutes);
app.use("/evaluaciones", evaluacionesRoutes);
app.use("/historiales", historialesRoutes);
app.use("/usuarios", usuariosRoutes);

// Middleware para manejar rutas no válidas
app.all("*", (req, res, next) => {
  next(new ExpressError("Recurso no encontrado!", 404));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Algo salió mal!";
  console.error(err.stack);
  res.status(statusCode).json({ error: err.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
