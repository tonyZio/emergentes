// login-form.js
class LoginForm extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <form id="loginForm">
                <div class="form-group">
                  <label for="username">Usuario:</label>
                  <input type="text" class="form-control" id="username" placeholder="Ingrese su usuario">
                </div>
                <div class="form-group">
                  <label for="password">Contraseña:</label>
                  <input type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
                </div>
                <button type="button" class="btn btn-primary" id="loginButton">Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      `;
  
      // Agrega un evento al botón de inicio de sesión
      this.shadowRoot.getElementById('loginButton').addEventListener('click', () => this.login());
    }
  
    // Método para manejar la autenticación
    async login() {
      const nombreUsuario = this.shadowRoot.getElementById('username').value;
      const contrasenia = this.shadowRoot.getElementById('password').value;
  
        const data={
          nombreUsuario,
          contrasenia
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','http://localhost:3000');

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem("jwt",data.token);
            this.showHomePage()
            return;
          }
          throw new Error("No autenticado");
        }).catch(error => {
          console.error('Error:', error);
        });
    }
  
    // Método para mostrar la página de inicio
    showHomePage() {
      // Crea una instancia del componente home-page
      /*const homePage = document.createElement('home-page');
  
      // Remplaza el contenido actual del shadow DOM con el componente home-page
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(homePage); */
      window.location.href = `home.html`;
    }
  }
  
  customElements.define('login-form', LoginForm);