class VerEmpleado extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    const empleados = await this.loadEmpleados();
    const scriptElement = document.createElement("script");
    scriptElement.src = "components/tables/Table.js";

    document.head.appendChild(scriptElement);
    console.log(empleados);
    this.shadowRoot.innerHTML = `
      <main-table data=${JSON.stringify(empleados)}></main-table>
    `;
  }

  async loadEmpleados() {
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
        return empleados;
      } else {
        console.error("Error al obtener Empleados:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }
}

customElements.define("tabla-empleado", VerEmpleado);
