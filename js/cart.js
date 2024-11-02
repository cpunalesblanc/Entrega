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
        preciosDiv.innerHTML += `<p>$${product.price.toFixed(2)}</p>`; // Precio del producto

        // Inicializar cantidad y subtotal
        myInput.value = 1; // Iniciar en 1
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
        }
    }

    function actualizarSubtotal(precio) {
        const cantidad = parseInt(myInput.value);
        const subtotal = precio * cantidad;
        document.querySelector('.subtotal p').textContent = `$${subtotal.toFixed(2)}`;
    }
});
