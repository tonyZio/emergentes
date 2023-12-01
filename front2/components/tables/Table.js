class CustomTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const data = JSON.parse(this.getAttribute("data"));
    const entity = this.getAttribute("entity");
    this.renderTable(data, entity);
  }

  renderTable(data, entity) {
    const table = document.createElement("table");

    const headerRow = table.insertRow();
    for (const key in data[0]) {
      if (key !== "ID") {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
      }
    }

    data.forEach((item) => {
      const row = table.insertRow();
      for (const key in item) {
        if (key !== "ID") {
          const cell = row.insertCell();
          cell.textContent = item[key];
        }
      }
      const updateButton = document.createElement("button");
      updateButton.textContent = "Actualizar";
      updateButton.addEventListener("click", () =>
        this.updateRow(item, entity)
      );
      const updateCell = row.insertCell();
      updateCell.appendChild(updateButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", () =>
        this.deleteRow(item, entity)
      );
      const deleteCell = row.insertCell();
      deleteCell.appendChild(deleteButton);
    });

    this.shadowRoot.appendChild(table);
  }

  updateRow(item, entity) {
    switch (entity) {
      case "empleado":
        localStorage.setItem("empleadoId", item.ID);
        window.location.href = `empleado.html?opcion=actualizar`;
        break;

      case "beneficios":
        break;

      case "departamento":
        break;

      case "evaluacion":
        break;
    }
  }

  deleteRow(item, entity) {
    switch (entity) {
      case "empleado":
        const resultado = window.confirm(
          "¿Estás seguro de que quieres eliminar al empleado?"
        );
        resultado ? this.deleteEmpleado(item) : "";
        break;

      case "beneficios":
        break;

      case "departamento":
        break;

      case "evaluacion":
        break;
    }
  }

  async deleteEmpleado(item) {
    try {
      console.log(item);
      const response = await fetch(
        `http://localhost:3000/empleados/${item.ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        window.alert("El empleado ha sido eliminado!");
      } else {
        console.error("Error al eliminar el empleado:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  }
}

customElements.define("main-table", CustomTable);
