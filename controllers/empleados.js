const Empleado = require('./ruta-de-tu-modelo-empleado');

// Controlador para crear un nuevo empleado
exports.createEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    await nuevoEmpleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo empleado' });
  }
};

// Controlador para obtener todos los empleados
exports.getAllEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

// Controlador para obtener un empleado por ID
exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

// Controlador para actualizar un empleado por ID
exports.updateEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

// Controlador para eliminar un empleado por ID
exports.deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndRemove(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};
