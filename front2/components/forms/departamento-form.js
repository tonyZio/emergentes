class DepartamentoForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
      const option = this.getAttribute("option");
  
      if (option === "actualizar") {
        const departamentoId = this.getAttribute("departamento-id");
        if (departamentoId) {
          await this.loadDepartamentoData(departamentoId);
        } else {
          console.error("No se proporcionó un ID de departamento para actualizar.");
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
  
      const datosDepartamento = {
        NombreDepartamento: this.shadowRoot.getElementById("nombreDepartamento").value,
        DescripcionDepartamento: this.shadowRoot.getElementById("descripcionDepartamento").value,
      };
  
      try {
        if (isActualizar) {
          const departamentoId = this.getAttribute("departamento-id");
          const response = await fetch(
            `http://localhost:3000/departamentos/${departamentoId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
              body: JSON.stringify(datosDepartamento),
            }
          );
  
          if (response.ok) {
            const updateDepartamento = await response.json();
            console.log("Departamento actualizado:", updateDepartamento);
  
            elementosInput.forEach((input) => {
              input.value = "";
            });
  
            this.loadFormulario();
          } else {
            console.error("Error al actualizar departamento:", response.statusText);
          }
        } else {
          const response = await fetch("http://localhost:3000/departamentos/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(datosDepartamento),
          });
  
          if (response.ok) {
            const nuevoDepartamento = await response.json();
            console.log("Departamento Creado:", nuevoDepartamento);
  
            elementosInput.forEach((input) => {
              input.value = "";
            });
  
            this.loadFormulario();
          } else {
            console.error("Error al crear departamento:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    }
  
    async loadDepartamentoData(departamentoId) {
      try {
        const response = await fetch(
          `http://localhost:3000/departamentos/${departamentoId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
  
        if (response.ok) {
          const departamento = await response.json();
          console.log(departamento);
  
          this.loadFormulario("actualizar", departamento);
  
          this.shadowRoot
            .querySelector("form")
            .addEventListener("submit", (event) => {
              this.handleFormSubmit("actualizar", event);
            });
        } else {
          console.error("Error al obtener departamento:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    }
  
    loadFormulario(option, departamento) {
      const isActualizar = option === "actualizar";
  
      const nombreDepartamentoValue =
        isActualizar && departamento.NombreDepartamento
          ? `value="${departamento.NombreDepartamento}"`
          : "";
  
      const descripcionDepartamentoValue =
        isActualizar && departamento.DescripcionDepartamento
          ? `value="${departamento.DescripcionDepartamento}"`
          : "";
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="css/styles.css" />
        <h1>${
          isActualizar ? "Actualizar" : "Formulario para agregar"
        } departamento</h1>
        
        <form action="" method="POST">
          <fieldset>
            <legend>Datos del Departamento</legend>
      
            <label for="nombreDepartamento">Nombre del Departamento:</label>
            <input type="text" id="nombreDepartamento" name="NombreDepartamento" ${nombreDepartamentoValue} required><br><br>
      
            <label for="descripcionDepartamento">Descripción del Departamento:</label>
            <input type="text" id="descripcionDepartamento" name="DescripcionDepartamento" ${descripcionDepartamentoValue} required><br><br>
          </fieldset>
    
          <div style="display: flex; justify-content: space-between;">
            <input type="cancel" value="Cancelar" >
            <input type="submit" value="${isActualizar ? "Actualizar" : "Agregar"}">
          </div>
        </form>    
      `;
    }
  }
  
  customElements.define("departamento-form", DepartamentoForm);
  