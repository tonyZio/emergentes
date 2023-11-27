class VerEmpleado extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    const scriptElement = document.createElement("script");
    scriptElement.src = "components/tables/Table.js";

    document.head.appendChild(scriptElement);

    this.shadowRoot.innerHTML = `
        <main-table></main-table>
      `;
  }
}

customElements.define("tabla-empleado", VerEmpleado);
