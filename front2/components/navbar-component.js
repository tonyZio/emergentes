class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="home.html">Gestión empleados</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">

                        <!-- Entidad Empleados -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="entity1Dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Empleados
                            </a>
                            <div class="dropdown-menu" aria-labelledby="entity1Dropdown">
                                <a id="crearEmpleado" class="dropdown-item" href="#">Crear</a>
                                <a id="leerEmpleado" class="dropdown-item" href="#">Leer</a>
                            </div>
                        </li>

                        <!-- Entidad Beneficios -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="entity2Dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Beneficios
                            </a>
                            <div class="dropdown-menu" aria-labelledby="entity2Dropdown">
                                <a id="crearBeneficio" href="#">Crear</a>
                                <a id="leerBeneficio" href="#">Leer</a>
                            </div>
                        </li>

                        <!-- Entidad Departamentos -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="entity2Dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Departamentos
                            </a>
                            <div class="dropdown-menu" aria-labelledby="entity2Dropdown">
                                <a id="crearDepartamento" href="#">Crear</a>
                                <a id="leerDepartamento" href="#">Leer</a>
                            </div>
                        </li>

                        <!-- Entidad Evaluaciones -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="entity2Dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Evaluacion
                            </a>
                            <div class="dropdown-menu" aria-labelledby="entity2Dropdown">
                                <a id="crearEvaluacion" href="#">Crear</a>
                                <a id="leerEvaluacion" href="#">Leer</a>
                            </div>
                        </li>
                        

                        <!-- Puedes continuar agregando bloques similares para las otras entidades -->
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="logoutButton">
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

        <script src="js/main.js"></script>
        `;

    // const logoutButton = this.querySelector("#logoutButton");
    //  logoutButton.addEventListener("click", () => this.logout());

    this.shadowRoot
      .getElementById("crearEmpleado")
      .addEventListener("click", () => this.redirect("empleado.html", "crear"));

    this.shadowRoot
      .getElementById("leerEmpleado")
      .addEventListener("click", () => this.redirect("empleado.html", "leer"));

    this.shadowRoot
      .getElementById("crearBeneficio")
      .addEventListener("click", () =>
        this.redirect("beneficios.html", "crear")
      );

    this.shadowRoot
      .getElementById("leerBeneficio")
      .addEventListener("click", () =>
        this.redirect("beneficios.html", "leer")
      );

    this.shadowRoot
      .getElementById("crearDepartamento")
      .addEventListener("click", () =>
        this.redirect("departamento.html", "crear")
      );

    this.shadowRoot
      .getElementById("leerDepartamento")
      .addEventListener("click", () =>
        this.redirect("departamento.html", "leer")
      );

    this.shadowRoot
      .getElementById("crearEvaluacion")
      .addEventListener("click", () =>
        this.redirect("evaluacion.html", "crear")
      );

    this.shadowRoot
      .getElementById("leerEvaluacion")
      .addEventListener("click", () =>
        this.redirect("evaluacion.html", "leer")
      );
  }

  redirect(html, option) {
    const url = `${html}?opcion=${option}`;
    window.location.href = url;
  }

  logout() {
    // Elimina algo del local storage (ajusta según tus necesidades)
    localStorage.removeItem("jwt");

    // Redirecciona a la página de inicio de sesión (ajusta según tus necesidades)
    window.location.href = "index.html";
  }
}

customElements.define("navbar-component", NavbarComponent);
