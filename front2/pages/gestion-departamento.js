class GestionDepartamento extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const option = this.getAttribute("option");
    const departamentoId = this.getAttribute("departamento-id");

    const scriptElement = document.createElement("script");
    scriptElement.src = "components/forms/departamento-form.js";

    document.head.appendChild(scriptElement);

    this.shadowRoot.innerHTML = `
        <departamento-form option="${option}" departamento-id="${departamentoId}"></departamento-form>
      `;
  }
}

customElements.define("gestion-departamento", GestionDepartamento);
