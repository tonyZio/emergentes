class GestionBeneficio extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      const option = this.getAttribute("option");
      const beneficioId = this.getAttribute("beneficio-id");
  
      const scriptElement = document.createElement("script");
      scriptElement.src = "components/forms/beneficio-form.js";
  
      document.head.appendChild(scriptElement);
  
      this.shadowRoot.innerHTML = `
        <beneficio-form option="${option}" beneficio-id="${beneficioId}"></beneficio-form>
      `;
    }
  }
  
  customElements.define("gestion-beneficio", GestionBeneficio);
  