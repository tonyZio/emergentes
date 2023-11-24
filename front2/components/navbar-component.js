class NavbarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="home.html">Gestión empleados</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="entity1Dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Empleados
                            </a>
                            <div class="dropdown-menu" aria-labelledby="entity1Dropdown">
                                <a class="dropdown-item" href="#">Crear</a>
                                <a class="dropdown-item" href="#">Leer</a>
                                <a class="dropdown-item" href="#">Actualizar</a>
                                <a class="dropdown-item" href="#">Eliminar</a>
                            </div>
                        </li>
                        <!-- Repite el bloque anterior para las otras entidades -->

                        <!-- Entidad 2 -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="entity2Dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Entidad 2
                            </a>
                            <div class="dropdown-menu" aria-labelledby="entity2Dropdown">
                                <a class="dropdown-item" href="#">Crear</a>
                                <a class="dropdown-item" href="#">Leer</a>
                                <a class="dropdown-item" href="#">Actualizar</a>
                                <a class="dropdown-item" href="#">Eliminar</a>
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
        `;
        const logoutButton = this.querySelector('#logoutButton');
        logoutButton.addEventListener('click', () => this.logout());
    }

    logout() {
        // Elimina algo del local storage (ajusta según tus necesidades)
        localStorage.removeItem('jwt');

        // Redirecciona a la página de inicio de sesión (ajusta según tus necesidades)
        window.location.href = 'index.html';
    }
}

customElements.define('navbar-component', NavbarComponent);