class VerEvaluacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    const evaluaciones = await this.loadEvaluaciones();
    const scriptElement = document.createElement("script");
    scriptElement.src = "components/tables/Table.js";

    document.head.appendChild(scriptElement);

    const filteredEvaluaciones = await Promise.all(
      evaluaciones.map(async (evaluacion) => {
        const empleado = await this.getEmployeeInfo(evaluacion.Empleado._id);
        const evaluador = await this.getEmployeeInfo(evaluacion.Evaluador._id);

        return {
          ID: evaluacion._id,
          Empleado: empleado.NombreCompleto,
          Calificacion: evaluacion.Calificacion,
          Comentarios: evaluacion.ComentariosObservaciones,
          "Fecha de Evaluacion": evaluacion.FechaEvaluacion.split("T")[0],
          Evaluador: evaluador.NombreCompleto,
        };
      })
    );

    this.shadowRoot.innerHTML = `
          <main-table entity='evaluacion' data='${JSON.stringify(
            filteredEvaluaciones
          )}'></main-table>
        `;
  }

  async loadEvaluaciones() {
    try {
      const response = await fetch("http://localhost:3000/evaluaciones/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const evaluaciones = await response.json();
        return evaluaciones;
      } else {
        console.error("Error al obtener Evaluaciones:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }

  async getEmployeeInfo(employeeId) {
    try {
      const response = await fetch(
        `http://localhost:3000/empleados/${employeeId}`,
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
        return {
          NombreCompleto: `${empleado.Nombre} ${empleado.Apellido}`,
        };
      } else {
        console.error(
          "Error al obtener información del empleado:",
          response.statusText
        );
        return { NombreCompleto: "Nombre no disponible" };
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      return { NombreCompleto: "Nombre no disponible" };
    }
  }
}

customElements.define("tabla-evaluacion", VerEvaluacion);
