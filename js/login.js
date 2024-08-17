document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
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
    window.location.href = "index.html"; 
}
})
});
