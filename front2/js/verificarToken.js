function verificarToken() {
  var token = obtenerToken();

  if (token) {
    console.log("Usuario autenticado");
  } else {
    window.location.href = `index.html`;
  }
}

function obtenerToken() {
  let token = localStorage.getItem("jwt");
  return token ? token : null;
}

window.onload = verificarToken;
