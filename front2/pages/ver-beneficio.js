class VerBeneficio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    const beneficios = await this.loadBeneficios();
    const scriptElement = document.createElement("script");
    scriptElement.src = "components/tables/Table.js";

    document.head.appendChild(scriptElement);

    const filteredBeneficios = await Promise.all(
      beneficios.map(async (beneficio) => {
        // Aquí realizas la solicitud GET para obtener información del empleado
        const empleadoInfo = await this.getEmployeeInfo(beneficio.Empleado);

        return {
          ID: beneficio._id,
          Empleado: empleadoInfo.NombreCompleto, // Ajusta según la estructura de tu objeto de empleado
          "Tipo de Beneficio": beneficio.TipoBeneficio,
          "Fecha de Inicio": beneficio.FechaInicio.split("T")[0],
          "Fecha de Finalizacion": beneficio.FechaFinalizacion.split("T")[0],
          Detalles: beneficio.DetallesBeneficio,
        };
      })
    );

    this.shadowRoot.innerHTML = `
      <main-table entity='beneficio' data='${JSON.stringify(
        filteredBeneficios
      )}'></main-table>
    `;
  }

  async loadBeneficios() {
    try {
      const response = await fetch("http://localhost:3000/beneficios/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const beneficios = await response.json();
        return beneficios;
      } else {
        console.error("Error al obtener Beneficios:", response.statusText);
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

customElements.define("tabla-beneficio", VerBeneficio);
