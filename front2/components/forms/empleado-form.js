class EmpleadoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const option = this.getAttribute("option");

    if (option === "actualizar") {
      const empleadoId = this.getAttribute("empleado-id");
      if (empleadoId) {
        await this.loadEmpleadoData(empleadoId);
      } else {
        console.error("No se proporcionó un ID de empleado para actualizar.");
      }
    } else {
      this.loadDepartmentos(option);
      this.loadSupervisores();
      this.loadFormulario(option);

      this.shadowRoot
        .querySelector("form")
        .addEventListener("submit", (event) => {
          this.handleFormSubmit(option, event);
        });
    }

    this.shadowRoot
      .querySelector("#isSupervisor")
      .addEventListener("change", () => this.isSupervisor());
  }

  async handleFormSubmit(option, empleado, event) {
    event.preventDefault();

    const isActualizar = option === "actualizar";
    const elementosInput = this.shadowRoot.querySelectorAll("input");
    const hombreCheckbox = this.shadowRoot.getElementById("hombre");
    const mujerCheckbox = this.shadowRoot.getElementById("mujer");
    const selectDepartamento = this.shadowRoot.getElementById("departamento");
    const supervisorCheckbox = this.shadowRoot.getElementById("isSupervisor");
    const selectSupervisor = this.shadowRoot.getElementById("supervisor");

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
      NombreSupervisor: " ",
      Supervisor: " ",
      PuestoTrabajo: this.shadowRoot.getElementById("puestoTrabajo").value,
      NumeroSeguroSocial:
        this.shadowRoot.getElementById("numeroSeguroSocial").value,
      EsSupervisor: supervisor,
    };

    if (supervisor) {
      delete datosEmpleado.NombreSupervisor;
      delete datosEmpleado.Supervisor;
    } else {
      datosEmpleado.NombreSupervisor =
        selectSupervisor.options[selectSupervisor.selectedIndex].getAttribute(
          "data-nombre"
        );

      datosEmpleado.Supervisor =
        this.shadowRoot.getElementById("supervisor").value;
    }

    try {
      console.log(isActualizar);
      if (isActualizar) {
        const response = await fetch(
          `http://localhost:3000/empleados/${empleado._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(datosEmpleado),
          }
        );

        if (response.ok) {
          const updateEmpleado = await response.json();
          console.log("Empleado actualizado:", updateEmpleado);

          elementosInput.forEach((input) => {
            input.value = "";
            input.checked = false;
            selectDepartamento.selectedIndex = 0;
            selectSupervisor.selectedIndex = 0;
          });

          this.isSupervisor();
          this.loadFormulario();
        } else {
          console.error("Error al actualizar empleado:", response.statusText);
        }
      } else {
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
            selectSupervisor.selectedIndex = 0;
          });

          this.isSupervisor();
          this.loadFormulario();
        } else {
          console.error("Error al crear empleado:", response.statusText);
        }
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

  async loadDepartmentos(option, empleado) {
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
        const isActualizar = option === "actualizar";

        const selectDepartamento =
          this.shadowRoot.getElementById("departamento");

        departamentos.forEach((departamento) => {
          const option = document.createElement("option");
          option.value = departamento._id;
          option.setAttribute("data-nombre", departamento.NombreDepartamento);
          option.innerHTML = departamento.NombreDepartamento;

          if (isActualizar && empleado.Departamento === departamento._id) {
            option.selected = true;
          }

          selectDepartamento.appendChild(option);
        });
      } else {
        console.error("Error al obtener departamentos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  async loadSupervisores(option, empleadoFetch) {
    try {
      const response = await fetch("http://localhost:3000/empleados/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const empleados = await response.json();
        const isActualizar = option === "actualizar";

        const selectSupervisor = this.shadowRoot.getElementById("supervisor");

        empleados.forEach((empleado) => {
          if (empleado.EsSupervisor) {
            const option = document.createElement("option");
            option.value = empleado._id;
            option.setAttribute(
              "data-nombre",
              empleado.Nombre + " " + empleado.Apellido
            );
            option.innerHTML = empleado.Nombre + " " + empleado.Apellido;

            if (isActualizar && empleadoFetch.Supervisor === empleado._id) {
              option.selected = true;
            }

            selectSupervisor.appendChild(option);
          }
        });
      } else {
        console.error("Error al obtener Supervisores:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  async loadEmpleadoData(empleadoId) {
    try {
      const response = await fetch(
        `http://localhost:3000/empleados/${empleadoId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      if (response.ok) {
        const empleado = await response.json();
        console.log(empleado);

        this.loadDepartmentos("actualizar", empleado);
        this.loadSupervisores("actualizar", empleado);
        this.loadFormulario("actualizar", empleado);
        this.isSupervisor();

        this.shadowRoot
          .querySelector("form")
          .addEventListener("submit", (event) => {
            this.handleFormSubmit("actualizar", empleado, event);
          });
      } else {
        console.error("Error al obtener empleado:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  loadFormulario(option, empleado) {
    const isActualizar = option === "actualizar";

    const supervisorValue =
      isActualizar && empleado.EsSupervisor === true ? `checked` : "";

    const nombreValue =
      isActualizar && empleado.Nombre ? `value="${empleado.Nombre}"` : "";

    const apellidoValue =
      isActualizar && empleado.Apellido ? `value="${empleado.Apellido}"` : "";

    const fechaNacimientoValue =
      isActualizar && empleado.FechaNacimiento
        ? `value="${
            new Date(empleado.FechaNacimiento).toISOString().split("T")[0]
          }"`
        : "";

    const generoHombreValue =
      isActualizar && empleado.Genero === "Hombre" ? `checked` : "";

    const generoMujerValue =
      isActualizar && empleado.Genero === "Mujer" ? `checked` : "";

    const direccionValue =
      isActualizar && empleado.Direccion ? `value="${empleado.Direccion}"` : "";

    const telefonoValue =
      isActualizar && empleado.Telefono ? `value="${empleado.Telefono}"` : "";

    const correoValue =
      isActualizar && empleado.CorreoElectronico
        ? `value="${empleado.CorreoElectronico}"`
        : "";

    const fechaContratacionValue =
      isActualizar && empleado.FechaContratacion
        ? `value="${
            new Date(empleado.FechaContratacion).toISOString().split("T")[0]
          }"`
        : "";

    const salarioValue =
      isActualizar && empleado.Salario ? `value="${empleado.Salario}"` : "";

    const puestoTrabajoValue =
      isActualizar && empleado.PuestoTrabajo
        ? `value="${empleado.PuestoTrabajo}"`
        : "";

    const numeroSeguroSocialValue =
      isActualizar && empleado.NumeroSeguroSocial
        ? `value="${empleado.NumeroSeguroSocial}"`
        : "";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/styles.css" />
      <h1>${
        isActualizar ? "Actualizar" : "Formulario para agregar"
      } empleado</h1>
      
      <form action="" method="POST">
        <label for="supervisor">Soy un supervisor</label>
        <input type="checkbox" id="isSupervisor" name="supervisor" ${supervisorValue} /><br />
  
        <br />
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="Nombre" ${nombreValue} required/><br /><br />
  
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" name="Apellido"  ${apellidoValue} required /><br /><br />
  
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fechaNacimiento" name="FechaNacimiento" ${fechaNacimientoValue} required /><br /><br />
  
        <label>Género:</label><br />
        <input type="radio" id="hombre" name="Genero" value="Hombre" ${generoHombreValue}/>
        <label for="hombre">Hombre</label><br />
        <input type="radio" id="mujer" name="Genero" value="Mujer" ${generoMujerValue}/>
        <label for="mujer">Mujer</label><br /><br />
  
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" name="Direccion" ${direccionValue} required /><br /><br />
  
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="Telefono" ${telefonoValue} required /><br /><br />
  
        <label for="correo">Correo Electrónico:</label>
        <input type="email" id="correo" name="CorreoElectronico" ${correoValue} required /><br /><br />
  
        <label for="fechaContratacion">Fecha de Contratacion:</label>
        <input type="date" id="fechaContratacion" name="fechaContratacion" ${fechaContratacionValue} required /><br /><br />
  
        <label for="salario">Salario:</label>
        <input type="number" id="salario" name="Salario" min="0" ${salarioValue} required/><br /><br />
  
        <label for="departamento">Departamento:</label>
        <select id="departamento" name="Departamento" required>
          <!-- Opciones del departamento -->
        </select><br /><br />
  
        <label id="labelSupervisor" for="supervisor">Supervisor:</label>
        <select id="supervisor" name="Supervisor">
          <!-- Opciones del supervisor -->
        </select><br id="br-sup" /><br id="br-sup2" />
  
        <label for="puestoTrabajo">Puesto de Trabajo:</label>
        <input type="text" id="puestoTrabajo" name="puestoTrabajo" ${puestoTrabajoValue} required /><br /><br />
  
        <label for="numeroSeguroSocial">Número de Seguro Social:</label>
        <input type="text" id="numeroSeguroSocial" name="NumeroSeguroSocial" ${numeroSeguroSocialValue} required /><br /><br />
        
  
        <div style="display: flex; justify-content: space-between">
            <input type="cancel" value="Atrás" />
            <input type="submit" value="Enviar" />
        </div>
    </form>    
    `;
  }
}

customElements.define("empleado-form", EmpleadoForm);
