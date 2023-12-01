class Table extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["data"]; // Observa el atributo 'data'
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data" && oldValue !== newValue) {
      this.render();
    }
  }

  set data(value) {
    const dataArray = JSON.parse(value);

    if (dataArray.length > 0) {
      const table = document.createElement("table");

      // Encabezados
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      dataArray[0].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      for (let i = 1; i < dataArray.length; i++) {
        const row = document.createElement("tr");
        dataArray[i].forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = cell;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      }
      table.appendChild(tbody);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(table);
    } else {
      this.shadowRoot.innerHTML = "No hay datos disponibles";
    }
  }

  get data() {
    return this.getAttribute("data");
  }

  render() {
    const data = this.data;

    if (data) {
      this.data = data;
    } else {
      this.shadowRoot.innerHTML = 'Atributo "data" faltante';
    }
  }
}

customElements.define("main-table", Table);
