document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();
        let errorMensaje = "";

        // Validación de los campos de usuario y contraseña
        if (usuario === "") {
            errorMensaje += "El campo de usuario está vacío.\n";
        }

        if (contraseña === "") {
            errorMensaje += "El campo de contraseña está vacío.\n";
        }

        // Si hay errores, mostramos la alerta
        if (errorMensaje) {
            alert(errorMensaje);
        } else {
            // Validación de las credenciales con el backend
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: usuario, password: contraseña }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el login es exitoso, almacenamos los datos en localStorage
                    localStorage.setItem("sesionActiva", "true");
                    localStorage.setItem("usuario", usuario);
                    localStorage.setItem("token", data.token);  // Almacenamos el token JWT

                    // Redirige a la página principal
                    window.location.href = "./index.html";
                } else {
                    // Si las credenciales son incorrectas
                    alert("Usuario o contraseña incorrectos.");
                }
            } catch (error) {
                console.error('Error en la autenticación:', error);
                alert("Hubo un error al intentar iniciar sesión. Intente de nuevo más tarde.");
            }
        }
    });

});
