class BeneficioForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const option = this.getAttribute("option");
    const beneficio = {};

    if (option === "actualizar") {
      const beneficioId = this.getAttribute("beneficio-id");
      if (beneficioId) {
        this.loadBeneficioData(beneficioId);
      } else {
        console.error("No se proporcionó un ID de beneficio para actualizar.");
      }
    } else {
      this.loadEmpleados(option);
      this.loadFormulario(option);

      this.shadowRoot
        .querySelector("form")
        .addEventListener("submit", (event) => {
          this.handleFormSubmit(option, beneficio, event);
        });
    }
  }

  async handleFormSubmit(option, beneficio, event) {
    event.preventDefault();

    const isActualizar = option === "actualizar";
    const elementosInput = this.shadowRoot.querySelectorAll("input");

    const datosBeneficio = {
      Empleado: this.shadowRoot.getElementById("empleado").value,
      TipoBeneficio: this.shadowRoot.getElementById("tipoBeneficio").value,
      FechaInicio: new Date(
        this.shadowRoot.getElementById("fechaInicio").value
      ).toISOString(),
      FechaFinalizacion: new Date(
        this.shadowRoot.getElementById("fechaFinalizacion").value
      ).toISOString(),
      DetallesBeneficio:
        this.shadowRoot.getElementById("detallesBeneficio").value,
    };

    try {
      console.log(isActualizar);
      if (isActualizar) {
        console.log(datosBeneficio);
        const response = await fetch(
          `http://localhost:3000/beneficios/${beneficio._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(datosBeneficio),
          }
        );

        if (response.ok) {
          const updateBeneficio = await response.json();
          console.log("Beneficio actualizado:", updateBeneficio);

          elementosInput.forEach((input) => {
            input.value = "";
          });

          this.loadFormulario();
        } else {
          console.error("Error al actualizar beneficio:", response.statusText);
        }
      } else {
        const response = await fetch("http://localhost:3000/beneficios/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify(datosBeneficio),
        });

        if (response.ok) {
          const nuevoBeneficio = await response.json();
          console.log("Beneficio Creado:", nuevoBeneficio);

          elementosInput.forEach((input) => {
            input.value = "";
          });

          this.loadFormulario();
        } else {
          console.error("Error al crear beneficio:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  async loadEmpleados(option, beneficioFetch) {
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

        const selectEmpleado = this.shadowRoot.getElementById("empleado");

        empleados.forEach((empleado) => {
          const option = document.createElement("option");
          option.value = empleado._id;
          option.setAttribute(
            "data-nombre",
            empleado.Nombre + " " + empleado.Apellido
          );
          option.innerHTML = empleado.Nombre + " " + empleado.Apellido;

          if (isActualizar && beneficioFetch.Empleado === empleado._id) {
            option.selected = true;
          }

          selectEmpleado.appendChild(option);
        });
      } else {
        console.error("Error al obtener Supervisores:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  async loadBeneficioData(beneficioId) {
    try {
      const response = await fetch(
        `http://localhost:3000/beneficios/${beneficioId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      if (response.ok) {
        const beneficio = await response.json();

        this.loadEmpleados("actualizar", beneficio);
        this.loadFormulario("actualizar", beneficio);

        this.shadowRoot
          .querySelector("form")
          .addEventListener("submit", (event) => {
            this.handleFormSubmit("actualizar", beneficio, event);
          });
      } else {
        console.error("Error al obtener beneficio:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  loadFormulario(option, beneficio) {
    const isActualizar = option === "actualizar";

    const empleadoValue =
      isActualizar && beneficio.Empleado ? `value="${beneficio.Empleado}"` : "";

    const tipoBeneficioValue =
      isActualizar && beneficio.TipoBeneficio
        ? `value="${beneficio.TipoBeneficio}"`
        : "";

    const fechaInicioValue =
      isActualizar && beneficio.FechaInicio
        ? `value="${
            new Date(beneficio.FechaInicio).toISOString().split("T")[0]
          }"`
        : "";

    const fechaFinalizacionValue =
      isActualizar && beneficio.FechaFinalizacion
        ? `value="${
            new Date(beneficio.FechaFinalizacion).toISOString().split("T")[0]
          }"`
        : "";

    const detallesBeneficioValue =
      isActualizar && beneficio.DetallesBeneficio
        ? `value="${beneficio.DetallesBeneficio}"`
        : "";

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="css/styles.css" />
        <h1>${
          isActualizar ? "Actualizar" : "Formulario para agregar"
        } beneficio</h1>
        
        <form action="" method="POST">
          <fieldset>

            <legend>Detalles del Beneficio</legend>

            <label for="empleado">Empleado:</label>
            <select id="empleado" name="Empleado" required>
            </select><br /><br />

            <label for="tipoBeneficio">Tipo de Beneficio:</label>
            <input type="text" id="tipoBeneficio" name="TipoBeneficio" ${tipoBeneficioValue} required><br><br>
      
            <label for="fechaInicio">Fecha de Inicio:</label>
            <input type="date" id="fechaInicio" name="FechaInicio" ${fechaInicioValue} required><br><br>
      
            <label for="fechaFinalizacion">Fecha de Finalización:</label>
            <input type="date" id="fechaFinalizacion" name="FechaFinalizacion" ${fechaFinalizacionValue} required><br><br>
      
            <label for="detallesBeneficio">Detalles del Beneficio:</label>
            <input type="text" id="detallesBeneficio" name="DetallesBeneficio" ${detallesBeneficioValue} required><br><br>
          </fieldset>
      
          <div style="display: flex; justify-content: space-between;">
            <input id="cancel" type="cancel" value="Atrás" >
            <input id="submit" type="submit" value="Enviar">
          </div>
        </form>    
      `;

    this.shadowRoot
      .getElementById("cancel")
      .addEventListener("click", () =>
        this.redirect("beneficios.html", "leer")
      );

    this.shadowRoot
      .getElementById("submit")
      .addEventListener("click", () =>
        this.redirect("beneficios.html", "leer")
      );
  }

  redirect(html, option) {
    const url = `${html}?opcion=${option}`;
    window.location.href = url;
  }
}

customElements.define("beneficio-form", BeneficioForm);
