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

    this.loadDepartmentos();
    this.shadowRoot.innerHTML = formularioHTML;

    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => {
        this.handleFormSubmit(event);
      });

    this.shadowRoot
      .querySelector("#isSupervisor")
      .addEventListener("change", () => this.isSupervisor());
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const elementosInput = this.shadowRoot.querySelectorAll("input");
    const hombreCheckbox = this.shadowRoot.getElementById("hombre");
    const mujerCheckbox = this.shadowRoot.getElementById("mujer");
    const selectDepartamento = this.shadowRoot.getElementById("departamento");
    const supervisorCheckbox = this.shadowRoot.getElementById("isSupervisor");

    const genero = hombreCheckbox.checked
      ? "Hombre"
      : mujerCheckbox.checked
      ? "Mujer"
      : "";

    const supervisor = supervisorCheckbox.checked ? true : false;

    const datosEmpleado = {
      Nombre: this.shadowRoot.getElementById("nombre").value,
      Apellido: this.shadowRoot.getElementById("apellido").value,
      FechaNacimiento: new Date(
        this.shadowRoot.getElementById("fechaNacimiento").value
      ).toISOString(),
      Genero: genero,
      Direccion: this.shadowRoot.getElementById("direccion").value,
      Telefono: this.shadowRoot.getElementById("telefono").value,
      CorreoElectronico: this.shadowRoot.getElementById("correo").value,
      FechaContratacion: new Date(
        this.shadowRoot.getElementById("fechaContratacion").value
      ).toISOString(),
      Salario: this.shadowRoot.getElementById("salario").value,
      NombreDepartamento:
        selectDepartamento.options[
          selectDepartamento.selectedIndex
        ].getAttribute("data-nombre"),
      Departamento: this.shadowRoot.getElementById("departamento").value,
      NombreSupervisor: "Tony2",
      Supervisor: "60ad02ee5652b31518222139",
      PuestoTrabajo: this.shadowRoot.getElementById("puestoTrabajo").value,
      NumeroSeguroSocial:
        this.shadowRoot.getElementById("numeroSeguroSocial").value,
      EsSupervisor: supervisor,
    };

    if (supervisor) {
      delete datosEmpleado.NombreSupervisor;
      delete datosEmpleado.Supervisor;
    }

    console.log(datosEmpleado);

    try {
      const response = await fetch("http://localhost:3000/empleados/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(datosEmpleado),
      });

      if (response.ok) {
        const nuevoEmpleado = await response.json();
        console.log("Empleado Creado:", nuevoEmpleado);

        elementosInput.forEach((input) => {
          input.value = "";
          input.checked = false;
          selectDepartamento.selectedIndex = 0;
        });

        this.isSupervisor();
      } else {
        console.error("Error al crear empleado:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  isSupervisor() {
    const supervisor = this.shadowRoot.getElementById("supervisor");
    const labelSupervisor = this.shadowRoot.getElementById("labelSupervisor");
    const br = this.shadowRoot.getElementById("br-sup");
    const br2 = this.shadowRoot.getElementById("br-sup2");

    if (this.shadowRoot.querySelector("#isSupervisor").checked) {
      supervisor.style.display = "none";
      labelSupervisor.style.display = "none";
      br.style.display = "none";
      br2.style.display = "none";
    } else {
      supervisor.style.display = "block";
      labelSupervisor.style.display = "block";
      br.style.display = "block";
    }
  }

  async loadDepartmentos() {
    try {
      const response = await fetch("http://localhost:3000/departamentos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const departamentos = await response.json();

        const selectDepartamento =
          this.shadowRoot.getElementById("departamento");

        departamentos.forEach((departamento) => {
          const option = document.createElement("option");
          option.value = departamento._id;
          option.setAttribute("data-nombre", departamento.NombreDepartamento);
          option.innerHTML = departamento.NombreDepartamento;
          selectDepartamento.appendChild(option);
        });
      } else {
        console.error("Error al obtener departamentos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  loadFormulario(empleado) {
    return `
    <link rel="stylesheet" href="css/styles.css" />
    <h1>Formulario para agregar empleado</h1>
    
    <form action="" method="POST">
    
    
        <label for="supervisor">Soy un supervisor</label>
        <input type="checkbox" id="isSupervisor" name="supervisor" value="" /><br />
    
        <br />
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="Nombre" /><br /><br />
    
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" name="Apellido" required /><br /><br />
    
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fechaNacimiento" name="FechaNacimiento" required /><br /><br />
    
        <label>Género:</label><br />
        <input type="checkbox" id="hombre" name="Genero" value="Hombre" />
        <label for="hombre">Hombre</label><br />
        <input type="checkbox" id="mujer" name="Genero" value="Mujer" />
        <label for="mujer">Mujer</label><br /><br />
    
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" name="Direccion" required /><br /><br />
    
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="Telefono" required /><br /><br />
    
        <label for="correo">Correo Electrónico:</label>
        <input type="email" id="correo" name="CorreoElectronico" required /><br /><br />
    
        <label for="fechaContratacion">Fecha de Contratacion:</label>
        <input type="date" id="fechaContratacion" name="fechaContratacion" required /><br /><br />
    
        <label for="salario">Salario:</label>
        <input type="number" id="salario" name="Salario" min="0" required/><br /><br />
    
        <label for="departamento">Departamento:</label>
        <select id="departamento" name="Departamento" required>
        </select><br /><br />

        <label id="labelSupervisor" for="supervisor">Supervisor:</label>
        <select id="supervisor" name="Supervisor">
        </select><br id="br-sup" /><br id="br-sup2" />

        <label for="puestoTrabajo">Puesto de Trabajo:</label>
        <input type="text" id="puestoTrabajo" name="puestoTrabajo" required /><br /><br />
    
        <label for="numeroSeguroSocial">Número de Seguro Social:</label>
        <input type="text" id="numeroSeguroSocial" name="NumeroSeguroSocial" required /><br /><br />
    
        <div style="display: flex; justify-content: space-between">
            <input type="cancel" value="Atrás" />
            <input type="submit" value="Enviar" />
        </div>
    </form>    
    `;
  }
}

customElements.define("empleado-form", EmpleadoForm);
