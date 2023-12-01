class BeneficioForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      const option = this.getAttribute("option");
  
      if (option === "actualizar") {
        const beneficioId = this.getAttribute("beneficio-id");
        if (beneficioId) {
          this.loadBeneficioData(beneficioId);
        } else {
          console.error("No se proporcionó un ID de beneficio para actualizar.");
        }
      } else {
        this.loadFormulario(option);
        this.shadowRoot
          .querySelector("form")
          .addEventListener("submit", (event) => {
            this.handleFormSubmit(option, event);
          });
      }
    }
  
    async handleFormSubmit(option, event) {
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
        DetallesBeneficio: this.shadowRoot.getElementById("detallesBeneficio")
          .value,
      };
  
      try {
        if (isActualizar) {
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
            console.error(
              "Error al actualizar beneficio:",
              response.statusText
            );
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
          console.log(beneficio);
  
          this.loadFormulario("actualizar", beneficio);
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
          ? `value="${new Date(
              beneficio.FechaInicio
            ).toISOString().split("T")[0]}"`
          : "";
  
      const fechaFinalizacionValue =
        isActualizar && beneficio.FechaFinalizacion
          ? `value="${new Date(
              beneficio.FechaFinalizacion
            ).toISOString().split("T")[0]}"`
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
            <input type="text" id="empleado" name="Empleado" ${empleadoValue} required><br><br>
      
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
            <input type="cancel" value="Atrás" >
            <input type="submit" value="Enviar">
          </div>
        </form>    
      `;
    }
  }
  
  customElements.define("beneficio-form", BeneficioForm);
  