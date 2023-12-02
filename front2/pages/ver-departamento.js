class VerDepartamento extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    const departamentos = await this.loadDepartamentos();
    const scriptElement = document.createElement("script");
    scriptElement.src = "components/tables/Table.js";

    document.head.appendChild(scriptElement);

    const filteredDepartamentos = departamentos.map((departamento) => ({
      ID: departamento._id,
      "Nombre del Departamento": departamento.NombreDepartamento,
      "Descripcion del Departamento": departamento.DescripcionDepartamento,
      "Fecha de creacion": departamento.FechaCreacion.split("T")[0],
    }));

    this.shadowRoot.innerHTML = `
        <main-table entity='departamento' data='${JSON.stringify(
          filteredDepartamentos
        )}'></main-table>
      `;
  }

  async loadDepartamentos() {
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
        return departamentos;
      } else {
        console.error("Error al obtener departamentos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }
}

customElements.define("tabla-departamento", VerDepartamento);
