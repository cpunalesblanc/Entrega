document.addEventListener("DOMContentLoaded", function(){

    document.addEventListener("DOMContentLoaded", function() {
        if (localStorage.getItem("sesionActiva") !== "true") {
            window.location.href = "login.html";
        }
    });
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    const sesionActiva = localStorage.getItem("sesionActiva");

if (sesionActiva !== "true") {
window.location.href = "login.html";
}
});