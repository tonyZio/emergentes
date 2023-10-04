const HistorialLaboral = require('../models/HistorialLaboral');

// Controlador para crear un nuevo historial laboral
exports.createHistorialLaboral = async (req, res) => {
  try {
    const nuevoHistorial = new HistorialLaboral(req.body);
    await nuevoHistorial.save();
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo historial laboral' });
  }
};

// Controlador para obtener todos los historiales laborales
exports.getAllHistorialesLaborales = async (req, res) => {
  try {
    const historiales = await HistorialLaboral.find();
    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los historiales laborales' });
  }
};

// Controlador para obtener un historial laboral por ID
exports.getHistorialLaboralById = async (req, res) => {
  try {
    const historial = await HistorialLaboral.findById(req.params.id);
    if (!historial) {
      return res.status(404).json({ error: 'Historial laboral no encontrado' });
    }
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial laboral' });
  }
};

// Controlador para actualizar un historial laboral por ID
exports.updateHistorialLaboral = async (req, res) => {
  try {
    const historialActualizado = await HistorialLaboral.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!historialActualizado) {
      return res.status(404).json({ error: 'Historial laboral no encontrado' });
    }
    res.status(200).json(historialActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el historial laboral' });
  }
};

// Controlador para eliminar un historial laboral por ID
exports.deleteHistorialLaboral = async (req, res) => {
  try {
    const historialEliminado = await HistorialLaboral.findByIdAndRemove(req.params.id);
    if (!historialEliminado) {
      return res.status(404).json({ error: 'Historial laboral no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el historial laboral' });
  }
};
