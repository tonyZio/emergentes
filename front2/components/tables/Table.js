class Table extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <table>
        <th>Tabla<th>
    </table>`;
  }
}

customElements.define("main-table", Table);
