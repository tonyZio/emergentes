class GestionEvaluacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const option = this.getAttribute("option");
    const evaluacionId = this.getAttribute("evaluacion-id");

    const scriptElement = document.createElement("script");
    scriptElement.src = "components/forms/evaluacion-form.js";

    document.head.appendChild(scriptElement);

    this.shadowRoot.innerHTML = `
        <evaluacion-form option="${option}" evaluacion-id="${evaluacionId}"></evaluacion-form>
      `;
  }
}

customElements.define("gestion-evaluacion", GestionEvaluacion);
