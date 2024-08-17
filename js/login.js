document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();
    let errorMensaje = "";

    const usuarioCorrecto = "usuario";
    const contraseñaCorrecta = "contra123";

if (usuario === "") {
    errorMensaje += "El campo de usuario está vacío.";
}

if (contraseña === "") {
    errorMensaje += "El campo de contraseña está vacío.";
}

if (errorMensaje) {
    alert(errorMensaje);
} else if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {
    window.location.href = 'index.html';
} else {
    alert("Usuario o contraseña incorrectos.");
}
})
});
