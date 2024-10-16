document.addEventListener('DOMContentLoaded', function () {

const spanNav = document.getElementById('usernameDisplay');

    // Verificar si hay una sesión activa
const sesionActiva = localStorage.getItem("sesionActiva");
const usuario = localStorage.getItem("usuario");

// Si la sesión está activa y existe un nombre de usuario, mostrarlo en la barra de navegación

if (sesionActiva && usuario) {
    usernameDisplay.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" id="usernameDisplay" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Bienvenido, ${usuario}
        </a>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="usernameDisplay">
            <li><a class="dropdown-item" href="/my-profile.html">Perfil</a></li>
            <li><a class="dropdown-item" href="/cart.html">Carrito de Compras</a></li>
        </ul>
    `;} else {
        window.location.href = "login.html";
    }
});