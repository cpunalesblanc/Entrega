document.addEventListener('DOMContentLoaded', function () {

const spanNav = document.getElementById('usernameDisplay');

    // Verificar si hay una sesión activa
const sesionActiva = localStorage.getItem("sesionActiva");
    // Obtiene el nombre de usuario
const usuario = localStorage.getItem("usuario");

// Recuperar la cantidad de artículos del carrito
const cantidadArticulos = localStorage.getItem("cantidadArticulos") || 0; // Por defecto a 0 si no hay nada

// Si la sesión está activa y existe un nombre de usuario, muestra el nombre de usuario 'clickeable' para desplegar un menú
if (sesionActiva && usuario) {
    spanNav.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Bienvenido, ${usuario}
        </a>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="usernameDisplay">
            <li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
            <li><a class="dropdown-item" href="cart.html">Carrito de Compras <span class="badge text-bg-success">${cantidadArticulos}</span></a></li> 
            <li><a class="dropdown-item" id="cerrarSesion" href="#" onclick="cerrarSesion();">Cerrar sesión</a></li>
        </ul>
    `;
} else { // Si la sesión no está activa y no existe un nombre de usuario
    window.location.href = "login.html";
    }
});

function cerrarSesion (){
    window.localStorage.clear();
    window.location.href = "login.html"; // Redirige a la página de inicio de sesión
}
