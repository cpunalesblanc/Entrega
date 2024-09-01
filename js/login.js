document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();
        let errorMensaje = "";

        if (usuario === "") {
            errorMensaje += "El campo de usuario está vacío.";
        }

        if (contraseña === "") {
            errorMensaje += "El campo de contraseña está vacío.";
        }

        if (errorMensaje) {
            alert(errorMensaje);
        } else {
            // Almacena la sesión activa y el nombre del usuario en localStorage
            localStorage.setItem("sesionActiva", "true");
            localStorage.setItem("usuario", usuario);
            
            // Redirige al index.html
            window.location.href = "../index.html";
        }
        
    
    });

});