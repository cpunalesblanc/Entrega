

document.addEventListener('DOMContentLoaded', function () {
    const myInput = document.getElementById("canti");
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Obtener todos los productos en el carrito

    if (cartItems.length > 0) {
        const productosDiv = document.querySelector('.productos'); // Contenedor para todos los productos

        // Iterar sobre cada producto y mostrarlo
        cartItems.forEach(product => {
            const productoDiv = document.createElement('div');
            const contenedorDiv = document.getElementById('itemsCarrito')
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>Precio: $${product.price.toFixed(2)}</p>

                <button onclick="actualizarCantidad(${product.id})">Actualizar</button>
                <button onclick="eliminarProducto(${product.id})">Eliminar</button>
            `;
            contenedorDiv.appendChild(productoDiv);
        });

        // Inicializar subtotal
        actualizarSubtotal();
    } else {
        console.error("No se encontraron productos en el carrito.");
    }
});

// Función para actualizar la cantidad de un producto
function actualizarCantidad(productId) {
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${productId}).value`));
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.cantidad = nuevaCantidad; // Actualiza la cantidad
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado
        actualizarSubtotal(); // Recalcula el subtotal
    }
}

// Actualizar subtotal
function actualizarSubtotal() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let subtotal = 0;
    
    cartItems.forEach(item => {
        subtotal += item.price * item.cantidad; // Sumar al subtotal
    });

    document.querySelector('.subtotal p').textContent = subtotal.toFixed(2); // Mostrar subtotal
}

// Función para eliminar un producto del carrito
function eliminarProducto(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId); // Filtra el producto a eliminar
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado
    mostrarCarrito(); // Actualiza la vista
}

// Mostrar carrito después de eliminar un producto
function mostrarCarrito() {
    const productosDiv = document.querySelector('.productos');
    productosDiv.innerHTML = ''; // Limpia el contenido anterior
    cartItems.forEach(product => {
        // (Mostrar productos como antes...)
    });
}