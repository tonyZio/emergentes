const Beneficio = require("../models/Beneficios");

// Controlador para crear un nuevo beneficio
exports.createBeneficio = async (req, res) => {
  try {
    const nuevoBeneficio = new Beneficio(req.body);
    await nuevoBeneficio.save();
    res.status(201).json(nuevoBeneficio);
  } catch (error) {
    res.status(500).json({ error: "Error al crear un nuevo beneficio" });
  }
};

// Controlador para obtener todos los beneficios
exports.getAllBeneficios = async (req, res) => {
  try {
    const beneficios = await Beneficio.find();
    res.status(200).json(beneficios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los beneficios" });
  }
};

// Controlador para obtener un beneficio por ID
exports.getBeneficioById = async (req, res) => {
  try {
    const beneficio = await Beneficio.findById(req.params.id);
    if (!beneficio) {
      return res.status(404).json({ error: "Beneficio no encontrado" });
    }
    res.status(200).json(beneficio);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el beneficio" });
  }
};

// Controlador para actualizar un beneficio por ID
exports.updateBeneficio = async (req, res) => {
  try {
    const beneficio = await Beneficio.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!beneficio) {
      return res.status(404).json({ error: "Beneficio no encontrado" });
    }
    res.status(200).json(beneficio);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el beneficio" });
  }
};

// Controlador para eliminar un beneficio por ID
exports.deleteBeneficio = async (req, res) => {
  try {
    const beneficio = await Beneficio.findByIdAndRemove(req.params.id);
    if (!beneficio) {
      return res.status(404).json({ error: "Beneficio no encontrado" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el beneficio" });
  }
};
