class EmpleadoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    let empleado = {};
    const option = this.getAttribute("option");

    const formularioHTML =
      option === "crear" || "actualizar"
        ? this.loadFormulario(empleado)
        : "<p>Opcion invalida</p>";

    this.shadowRoot.innerHTML = formularioHTML;
  }

  loadFormulario(empleado) {
    return `
    <link rel="stylesheet" href="css/styles.css" />
    <h1>Formulario para agregar empleado</h1>
    
    <form action="" method="POST">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="Nombre" required value="${
      empleado && empleado.nombre ? empleado.nombre : ""
    }"/><br /><br />
    
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" name="Apellido" required 
        value="${
          empleado && empleado.apellido ? empleado.apellido : ""
        }"/><br /><br />
    
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="fechaNacimiento"
          name="FechaNacimiento"
          required
        /><br /><br />
      
        <label>Género:</label><br />
        <input type="checkbox" id="hombre" name="Genero" value="Hombre" />
        <label for="hombre">Hombre</label><br />
        <input type="checkbox" id="mujer" name="Genero" value="Mujer" />
        <label for="mujer">Mujer</label><br /><br />
    
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" name="Direccion" required value="${
          empleado && empleado.direccion ? empleado.direccion : ""
        }"/><br /><br />
    
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="Telefono" required value="${
          empleado && empleado.telefono ? empleado.telefono : ""
        }"/><br /><br />
    
        <label for="correo">Correo Electrónico:</label>
        <input
          type="email"
           id="correo"
           name="CorreoElectronico"
           required
           value="${empleado && empleado.email ? empleado.email : ""}"
        /><br /><br />
    
        <label for="salario">Salario:</label>
        <input type="number" id="salario" name="Salario" required value="${
          empleado && empleado.salario ? empleado.salario : ""
        }"/><br /><br />
    
        <label for="nombreDepartamento">Nombre del Departamento:</label>
        <input
          type="text"
          id="nombreDepartamento"
          name="NombreDepartamento"
          required
          value="${
            empleado && empleado.departamento ? empleado.departamento : ""
          }"
          /><br /><br />
    
        <label for="departamento">Departamento:</label>
        <select id="departamento" name="Departamento" required>
            <option value="Ventas">Ventas</option>
            <option value="Compras">Compras</option>
            <option value="Finanzas">Finanzas</option>
            <option value="Almacen">Almacén</option></select
        ><br /><br />
    
        <label for="supervisor">Supervisor:</label>
        <input
          type="text"
          id="supervisor"
          name="Supervisor"
          required
          value="${empleado && empleado.supervisor ? empleado.supervisor : ""}"
        /><br /><br />
    
        <label for="puestoTrabajo">Puesto de Trabajo:</label>
        <input
          type="text"
          id="puestoTrabajo"
          name="PuestoTrabajo"
          required
          value="${
            empleado && empleado.puestoTrabajo ? empleado.puestoTrabajo : ""
          }"
        /><br /><br />
    
        <label for="numeroSeguroSocial">Número de Seguro Social:</label>
        <input
          type="text"
          id="numeroSeguroSocial"
          name="NumeroSeguroSocial"
          required
          value="${
            empleado && empleado.numeroSeguro ? empleado.numeroSeguro : ""
          }"
        /><br /><br />
    
        <label for="descripcionDeFunciones">Descripcion de funciones:</label>
        <input
          type="text"
          id="descripcionDeFunciones"
          name="descripcionDeFunciones"
          required
          value="${
            empleado && empleado.descripcion ? empleado.descripcion : ""
          }"
        /><br /><br />
    
        <label for="nombreEmpresaAnterior">Nombre de la empresa enterior:</label>
        <input
          type="text"
          id="nombreEmpresaAnterior"
          name="nombreEmpresaAnterior"
          value="${
            empleado && empleado.empresaAnterior ? empleado.empresaAnterior : ""
          }"
        /><br /><br />
    
        <label for="motivoSalida">Motivo de Salida:</label>
        <input type="text" id="motivoSalida" name="motivoSalida" 
        value="${
          empleado && empleado.motivoSalida ? empleado.motivoSalida : ""
        }"
        /><br /><br />
    
        <div style="display: flex; justify-content: space-between">
            <input type="cancel" value="Atrás" />
            <input type="submit" value="Enviar" />
        </div>
    </form>`;
  }

  actualizarFormulario() {
    return "<h1>Formulario para actualizar empleado</h1>";
  }
}

customElements.define("empleado-form", EmpleadoForm);
