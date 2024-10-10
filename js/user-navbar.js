document.addEventListener('DOMContentLoaded', function () {

const spanNav = document.getElementById('usernameDisplay');

    // Verificar si hay una sesión activa
const sesionActiva = localStorage.getItem("sesionActiva");
const usuario = localStorage.getItem("usuario");

// Si la sesión está activa y existe un nombre de usuario, mostrarlo en la barra de navegación
if (sesionActiva && usuario) {
    spanNav.innerHTML(`<div class="dropdown"> 
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Bienvenido, ${usuario}
        </a>) `)
}



spanNav.innerHTML()


});

