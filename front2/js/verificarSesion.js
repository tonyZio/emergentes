function verificarSesion() {
  // Supongamos que obtienes el token de alguna manera (por ejemplo, desde una cookie o un almacenamiento local)
  var token = obtenerToken();

  // Verificar si el token existe
  if (token) {
    window.location.href = "home.html";
  }
}

// Función de ejemplo para obtener el token (simulación)
function obtenerToken() {
  let token = localStorage.getItem("jwt");
  console.log(token);
  return token ? token : null;
}
