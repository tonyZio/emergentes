const departamentoSchema = new mongoose.Schema({
    NombreDepartamento: String,
    DescripciónDepartamento: String,
    FechaCreación: Date
  });
  
  const Departamento = mongoose.model('Departamento', departamentoSchema);
  
  module.exports = Departamento;