
  document.addEventListener'DOMContentLoaded', function () {
    
    // Verificar si hay una sesión activa

    const sesionActiva = localStorage.getItem("sesionActiva");
    const usuarioEmail = localStorage.getItem("usuarioEmail");

    // Si la sesión no está activa, redirigir al login
    if (!sesionActiva) {
      window.location.href = "login.html"; // Reemplazar con la ruta de tu login
    }

    // Llenar el campo de email si existe una sesión activa
    if (usuarioEmail) {
      document.getElementById("email").value = usuarioEmail;
    }

    // Validar el formulario y guardar en localStorage
    document.getElementById("registroForm").addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Obtener valores de los campos
      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const email = document.getElementById("email").value.trim();

      // Validar campos obligatorios
      if (nombre && apellido && email) {
        // Guardar datos en localStorage
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("email", email);
        alert("¡Cambios guardados exitosamente!");

      } else {
        alert("Por favor, complete todos los campos obligatorios.");
      }
    });
};