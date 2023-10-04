const Departamento = require('../models/Departamento');

// Controlador para crear un nuevo departamento
exports.createDepartamento = async (req, res) => {
  try {
    const nuevoDepartamento = new Departamento(req.body);
    await nuevoDepartamento.save();
    res.status(201).json(nuevoDepartamento);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo departamento' });
  }
};

// Controlador para obtener todos los departamentos
exports.getAllDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los departamentos' });
  }
};

// Controlador para obtener un departamento por ID
exports.getDepartamentoById = async (req, res) => {
  try {
    const departamento = await Departamento.findById(req.params.id);
    if (!departamento) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.status(200).json(departamento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el departamento' });
  }
};

// Controlador para actualizar un departamento por ID
exports.updateDepartamento = async (req, res) => {
  try {
    const departamento = await Departamento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!departamento) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.status(200).json(departamento);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el departamento' });
  }
};

// Controlador para eliminar un departamento por ID
exports.deleteDepartamento = async (req, res) => {
  try {
    const departamento = await Departamento.findByIdAndRemove(req.params.id);
    if (!departamento) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el departamento' });
  }
};