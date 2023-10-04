const EvaluacionDesempeno = require('../models/EvaluacionDesempeno');

// Controlador para crear una nueva evaluación de desempeño
exports.createEvaluacionDesempeno = async (req, res) => {
  try {
    const nuevaEvaluacion = new EvaluacionDesempeno(req.body);
    await nuevaEvaluacion.save();
    res.status(201).json(nuevaEvaluacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear una nueva evaluación de desempeño' });
  }
};

// Controlador para obtener todas las evaluaciones de desempeño
exports.getAllEvaluacionesDesempeno = async (req, res) => {
  try {
    const evaluaciones = await EvaluacionDesempeno.find().populate('Empleado Evaluador');
    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las evaluaciones de desempeño' });
  }
};

// Controlador para obtener una evaluación de desempeño por ID
exports.getEvaluacionDesempenoById = async (req, res) => {
  try {
    const evaluacion = await EvaluacionDesempeno.findById(req.params.id).populate('Empleado Evaluador');
    if (!evaluacion) {
      return res.status(404).json({ error: 'Evaluación de desempeño no encontrada' });
    }
    res.status(200).json(evaluacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la evaluación de desempeño' });
  }
};

// Controlador para actualizar una evaluación de desempeño por ID
exports.updateEvaluacionDesempeno = async (req, res) => {
  try {
    const evaluacion = await EvaluacionDesempeno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('Empleado Evaluador');
    if (!evaluacion) {
      return res.status(404).json({ error: 'Evaluación de desempeño no encontrada' });
    }
    res.status(200).json(evaluacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la evaluación de desempeño' });
  }
};

// Controlador para eliminar una evaluación de desempeño por ID
exports.deleteEvaluacionDesempeno = async (req, res) => {
  try {
    const evaluacion = await EvaluacionDesempeno.findByIdAndRemove(req.params.id);
    if (!evaluacion) {
      return res.status(404).json({ error: 'Evaluación de desempeño no encontrada' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la evaluación de desempeño' });
  }
};
