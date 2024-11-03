document.addEventListener('DOMContentLoaded', function () {
    const myInput = document.getElementById("canti");

    // Recuperar el producto del localStorage
    const cartItem = localStorage.getItem('cartItem');
    if (cartItem) {
        const product = JSON.parse(cartItem);
        
        // Mostrar la información del producto en el carrito
        const productoDiv = document.querySelector('.producto');
        productoDiv.querySelector('h2').textContent = product.name; // Nombre del producto
        productoDiv.querySelector('img').src = product.image; // Imagen del producto
        productoDiv.querySelector('p').textContent = 'Descripción del producto'; // Puedes agregar la descripción si la tienes
       
        // Mostrar el precio
        const preciosDiv = document.querySelector('.precios');
        preciosDiv.innerHTML += `<p>${product.price.toFixed(2)}</p>`; // Precio del producto

        // Inicializar cantidad y subtotal
        myInput.value = 1; // Iniciar en 1
        localStorage.setItem("cantidadArticulos", myInput.value); // Inicializa la cantidad en localStorage
        actualizarSubtotal(product.price);

        // Manejar cambios en la cantidad
        document.getElementById('mas').addEventListener('click', function() {
            stepper(this);
            actualizarSubtotal(product.price);
        });

        document.getElementById('menos').addEventListener('click', function() {
            stepper(this);
            actualizarSubtotal(product.price);
        });
    } else {
        console.error("No se encontró ningún producto en el carrito.");
    }

    function stepper(btn) {
        let id = btn.getAttribute("id");
        let min = myInput.getAttribute("min");
        let max = myInput.getAttribute("max");
        let step = myInput.getAttribute("step");
        let val = parseInt(myInput.value);
        let calculoStep = (id == "mas") ? (parseInt(step)) : (parseInt(step) * -1);
        let nuevoValue = val + calculoStep;

        if (nuevoValue >= min && nuevoValue <= max) {
            myInput.value = nuevoValue; // Actualiza el valor del input
            localStorage.setItem("cantidadArticulos", nuevoValue); // Actualiza la cantidad en localStorage
        }
    }

    function actualizarSubtotal(precio) {
        const cantidad = parseInt(myInput.value);
        const subtotal = precio * cantidad;
        document.querySelector('.subtotal p').textContent = `$${subtotal.toFixed(2)}`;
    }
});

// Función para eliminar el producto del carrito
function eliminarProducto() {
    localStorage.removeItem('cartItem'); // Eliminar el producto de localStorage
    localStorage.removeItem('cantidadArticulos'); // Eliminar la cantidad de artículos
    mostrarMensajeCarritoVacio(); // Actualizar el DOM
}

// Función para mostrar el mensaje cuando el carrito está vacío
function mostrarMensajeCarritoVacio() {
    document.querySelector('.compras').innerHTML = "<p class='mensaje-vacio'>No hay ningún producto cargado en el carrito.</p>";
}