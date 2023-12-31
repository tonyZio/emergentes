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

    const filteredEmpleados = empleados.map((empleado) => ({
      ID: empleado._id,
      Nombre: empleado.Nombre,
      Apellido: empleado.Apellido,
      Teléfono: empleado.Telefono,
      "Correo Electrónico": empleado.CorreoElectronico,
      "Nombre del Departamento": empleado.NombreDepartamento,
      "Puesto de Trabajo": empleado.PuestoTrabajo,
      "¿Es Supervisor?": empleado.EsSupervisor ? "Si" : "No",
    }));

    this.shadowRoot.innerHTML = `
      <main-table entity='empleado' data='${JSON.stringify(
        filteredEmpleados
      )}'></main-table>
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
