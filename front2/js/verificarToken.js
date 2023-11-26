function verificarToken() {
  // Supongamos que obtienes el token de alguna manera (por ejemplo, desde una cookie o un almacenamiento local)
  var token = obtenerToken();

  // Verificar si el token existe
  if (!token) {
    // El usuario tiene un token, no es necesario redirigir
    console.log("Usuario autenticado");
  } else {
    window.location.href = `index.html`;
  }
}

// Función de ejemplo para obtener el token (simulación)
function obtenerToken() {
  let token = localStorage.getItem("jwt");
  return token ? token : null;
}

// Llamar a la función de verificación al cargar la página
window.onload = verificarToken;
