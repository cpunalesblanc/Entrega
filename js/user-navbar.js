document.addEventListener('DOMContentLoaded', function () {

const spanNav = document.getElementById('usernameDisplay');

    // Verificar si hay una sesión activa
const sesionActiva = localStorage.getItem("sesionActiva");
    // Obtiene el nombre de usuario
const usuario = localStorage.getItem("usuario");

//Acceder a la cantidad de artículos en el carrito
let cantidadArticulos = 0;
let cartItems = localStorage.getItem('cartItems');
if (cartItems){
    const parsedCartItems = JSON.parse(cartItems);
    cantidadArticulos = parsedCartItems.length;
}

// Si la sesión está activa y existe un nombre de usuario, muestra el nombre de usuario 'clickeable' para desplegar un menú
if (sesionActiva && usuario) {
    spanNav.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Bienvenido, ${usuario}
        </a>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="usernameDisplay">
            <li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
            <li><a class="dropdown-item" href="cart.html">Carrito de Compras <span class="badge rounded-pill text bg-success">${cantidadArticulos}</span></a></li> 
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
