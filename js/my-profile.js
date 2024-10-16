
document.addEventListener("DOMContentLoaded", function () {
    
// Verificar si hay una sesión activa
const sesionActiva = localStorage.getItem("sesionActiva");
const usuarioEmail = localStorage.getItem("usuario");

// Si la sesión no está activa, redirigir al login
if (!sesionActiva) {
    window.location.href = "login.html"; // Reemplazar con la ruta de tu login
}

// Llenar el campo de email si existe una sesión activa
document.getElementById("email").value = usuarioEmail || "";

// Reiniciar los campos del formulario (excepto el email)
document.getElementById("nombre").value = "";
document.getElementById("apellido").value = "";
document.getElementById("Telefono").value = "";
document.getElementById("seNombre").value = "";
document.getElementById("seApellido").value = "";

// Validar el formulario y guardar en localStorage
document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener valores de los campos
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("Telefono");
    const seNombre = document.getElementById("seNombre");
    const seApellido = document.getElementById("seApellido");

    // Reiniciar mensajes de error
    limpiarErrores();

    let valido = true;

    // Validar campos obligatorios
    if (nombre.value.trim() === "") {
        mostrarError(nombre, "Por favor, ingresa tu nombre.");
        valido = false;
    }

    if (apellido.value.trim() === "") {
        mostrarError(apellido, "Por favor, ingresa tu apellido.");
        valido = false;
    }

    if (email.value.trim() === "") {
        mostrarError(email, "Por favor, ingresa tu email.");
        valido = false;
    }

    // Si todos los campos son válidos, guardar en localStorage
    if (valido) {
        localStorage.setItem("nombre", nombre.value.trim());
        localStorage.setItem("apellido", apellido.value.trim());
        localStorage.setItem("email", email.value.trim());
        localStorage.setItem("telefono", telefono.value.trim());
        localStorage.setItem("segundoNombre", seNombre.value.trim());
        localStorage.setItem("segundoApellido", seApellido.value.trim());
        alert("¡Cambios guardados exitosamente!");
    }
});

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback";
    errorDiv.textContent = mensaje;
    elemento.classList.add("is-invalid");
    elemento.parentNode.appendChild(errorDiv);
}

// Función para limpiar mensajes de error anteriores
function limpiarErrores() {
    const errores = document.querySelectorAll(".invalid-feedback");
    errores.forEach(function (error) {
        error.remove();
    });

    const campos = document.querySelectorAll(".form-control");
    campos.forEach(function (campo) {
        campo.classList.remove("is-invalid");
  });
}
});
  