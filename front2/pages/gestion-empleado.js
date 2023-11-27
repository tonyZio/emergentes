class GestionEmpleado extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const option = this.getAttribute("option");

    const scriptElement = document.createElement("script");
    scriptElement.src = "components/forms/empleado-form.js";

    document.head.appendChild(scriptElement);

    this.shadowRoot.innerHTML = `
      <empleado-form option="${option}"></empleado-form>
    `;
  }






}

customElements.define("gestion-empleado", GestionEmpleado);
