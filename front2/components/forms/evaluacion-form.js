class EvaluacionForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
      const option = this.getAttribute("option");
  
      if (option === "actualizar") {
        const evaluacionId = this.getAttribute("evaluacion-id");
        if (evaluacionId) {
          await this.loadEvaluacionData(evaluacionId);
        } else {
          console.error("No se proporcionó un ID de evaluación para actualizar.");
        }
      } else {
        this.loadEmpleados();
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
  
      const datosEvaluacion = {
        Empleado: this.shadowRoot.getElementById("empleado").value,
        FechaEvaluacion: new Date(
          this.shadowRoot.getElementById("fechaEvaluacion").value
        ).toISOString(),
        Calificacion: this.shadowRoot.getElementById("calificacion").value,
        ComentariosObservaciones: this.shadowRoot.getElementById("comentariosObservaciones").value,
        Evaluador: this.shadowRoot.getElementById("evaluador").value,
      };
  
      try {
        if (isActualizar) {
          const evaluacionId = this.getAttribute("evaluacion-id");
          const response = await fetch(
            `http://localhost:3000/evaluaciones/${evaluacionId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
              body: JSON.stringify(datosEvaluacion),
            }
          );
  
          if (response.ok) {
            const updateEvaluacion = await response.json();
            console.log("Evaluación actualizada:", updateEvaluacion);
  
            elementosInput.forEach((input) => {
              input.value = "";
            });
  
            this.loadFormulario();
          } else {
            console.error("Error al actualizar evaluación:", response.statusText);
          }
        } else {
          const response = await fetch("http://localhost:3000/evaluaciones/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(datosEvaluacion),
          });
  
          if (response.ok) {
            const nuevaEvaluacion = await response.json();
            console.log("Evaluación Creada:", nuevaEvaluacion);
  
            elementosInput.forEach((input) => {
              input.value = "";
            });
  
            this.loadFormulario();
          } else {
            console.error("Error al crear evaluación:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    }
  
    async loadEvaluacionData(evaluacionId) {
      try {
        const response = await fetch(
          `http://localhost:3000/evaluaciones/${evaluacionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
  
        if (response.ok) {
          const evaluacion = await response.json();
          console.log(evaluacion);
  
          this.loadEmpleados("actualizar", evaluacion);
          this.loadFormulario("actualizar", evaluacion);
  
          this.shadowRoot
            .querySelector("form")
            .addEventListener("submit", (event) => {
              this.handleFormSubmit("actualizar", event);
            });
        } else {
          console.error("Error al obtener evaluación:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    }
  
    async loadEmpleados(option, evaluacion) {
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
            option.innerHTML = empleado.Nombre + " " + empleado.Apellido;
  
            if (isActualizar && evaluacion.Empleado === empleado._id) {
              option.selected = true;
            }
  
            selectEmpleado.appendChild(option);
          });
        } else {
          console.error("Error al obtener empleados:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    }
  
    loadFormulario(option, evaluacion) {
      const isActualizar = option === "actualizar";
  
      const empleadoValue =
        isActualizar && evaluacion.Empleado
          ? `value="${evaluacion.Empleado}"`
          : "";
  
      const fechaEvaluacionValue =
        isActualizar && evaluacion.FechaEvaluacion
          ? `value="${
              new Date(evaluacion.FechaEvaluacion).toISOString().split("T")[0]
            }"`
          : "";
  
      const calificacionValue =
        isActualizar && evaluacion.Calificacion
          ? `value="${evaluacion.Calificacion}"`
          : "";
  
      const comentariosObservacionesValue =
        isActualizar && evaluacion.ComentariosObservaciones
          ? `value="${evaluacion.ComentariosObservaciones}"`
          : "";
  
      const evaluadorValue =
        isActualizar && evaluacion.Evaluador
          ? `value="${evaluacion.Evaluador}"`
          : "";
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="css/styles.css" />
        <h1>${
          isActualizar ? "Actualizar" : "Formulario para agregar"
        } evaluación</h1>
        
        <form action="" method="POST">
          <fieldset>
            <legend>Detalles de la Evaluación</legend>
      
            <label for="empleado">Empleado:</label>
            <select id="empleado" name="Empleado" required>
              <!-- Opciones del empleado -->
            </select><br><br>
      
            <label for="fechaEvaluacion">Fecha de Evaluación:</label>
            <input type="date" id="fechaEvaluacion" name="FechaEvaluacion" ${fechaEvaluacionValue} required><br><br>
      
            <label for="calificacion">Calificación:</label>
            <input type="number" id="calificacion" name="Calificacion" ${calificacionValue} required><br><br>
      
            <label for="comentariosObservaciones">Comentarios u Observaciones:</label>
            <input type="text" id="comentariosObservaciones" name="ComentariosObservaciones" ${comentariosObservacionesValue} required><br><br>
    
            <label for="evaluador">Evaluador:</label>
            <input type="text" id="evaluador" name="Evaluador" ${evaluadorValue} required><br><br>
          </fieldset>
      
          <div style="display: flex; justify-content: space-between;">
            <input type="cancel" value="Atrás">
            <input type="submit" value="Enviar">
          </div>
        </form>
      `;
    }
  }
  
  customElements.define("evaluacion-form", EvaluacionForm);
  
  