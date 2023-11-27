const jwt = require("jsonwebtoken");
const {
  beneficiosSchema,
  departamentoSchema,
  empleadoSchema,
  evaluacionDesempenoSchema,
  historialLaboralSchema,
  usuarioSchema,
} = require("./schemas");
const ExpressError = require("./utils/expressError");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    throw new ExpressError("Token no proporcionado", 401);
    //return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verifica y decodifica el token JWT utilizando la clave secreta
    const secretKey = process.env.SECRET_KEY || "secreto"; // Obtén la clave secreta de las variables de entorno
    const tokenWithoutBearer = token.split(" ")[1]; // Extraer el token sin "Bearer"
    const decoded = jwt.verify(tokenWithoutBearer, secretKey);

    // Puedes acceder a los datos del token, por ejemplo, el ID de usuario
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new ExpressError("Token invalido", 401);
    //res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware de validación para Beneficios
const validateBeneficios = (req, res, next) => {
  const { error } = beneficiosSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400); // Reemplaza con tu manejo de errores personalizado
  } else {
    next();
  }
};

// Middleware de validación para Departamento
const validateDepartamento = (req, res, next) => {
  const { error } = departamentoSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Middleware de validación para Empleado
const validateEmpleado = (req, res, next) => {
  const { error } = empleadoSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Middleware de validación para EvaluacionDesempeno
const validateEvaluacionDesempeno = (req, res, next) => {
  const { error } = evaluacionDesempenoSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Middleware de validación para HistorialLaboral
const validateHistorialLaboral = (req, res, next) => {
  const { error } = historialLaboralSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateUsuario = (req, res, next) => {
  const { error } = usuarioSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = {
  verifyToken,
  validateBeneficios,
  validateDepartamento,
  validateEmpleado,
  validateEvaluacionDesempeno,
  validateHistorialLaboral,
  validateUsuario,
};
