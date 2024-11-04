const myInput = document.getElementById("canti");
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Obtener todos los productos en el carrito


document.addEventListener('DOMContentLoaded', function () {
    

    if (cartItems.length > 0) {
        // Iterar sobre cada producto y mostrarlo
        cartItems.forEach(product => {
            const productoDiv = document.createElement('div');
            const contenedorDiv = document.getElementById('itemsCarrito')
            productoDiv.classList.add('productos');
            productoDiv.innerHTML = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <th scope="row">
                        <img src="${product.image}" alt="${product.name}" class="w-50">
                    </th>
                    <td>
                        <h2>${product.name}</h2>
                    </td>
                    <td>
                        <div class="botoncanti">
                            <button id="menos" onclick="stepper(this, ${product.id})"> - </button>  
                            <input id="canti${product.id}" type="number" min="0" max="100" step="1" value="0" readonly >
                            <button id="mas" onclick="stepper(this, ${product.id})"> + </button> 
                        </div>
                    </td>
                    <td>Precio: $${product.price.toFixed(2)}
                    <td>
                    </tr>
                </tbody>
                </table>
            `;
            contenedorDiv.appendChild(productoDiv);
        });

        // Inicializar subtotal
        actualizarSubtotal();
    } else {
        console.error("No se encontraron productos en el carrito.");
    }
});

function stepper(btn, productId) {
    let cantidadDisplay = document.getElementById(`canti${productId}`);
    let id = btn.getAttribute("id");
    let min = cantidadDisplay.getAttribute("min");
    let max = cantidadDisplay.getAttribute("max");
    let step = cantidadDisplay.getAttribute("step");
    let val = parseInt(cantidadDisplay.value);
    let calculoStep = (id == "mas") ? (parseInt(step)) : (parseInt(step) * -1);
    let nuevoValue = val + calculoStep;
    const item = cartItems.find(item => item.id === productId);

    if (nuevoValue >= min && nuevoValue <= max) {
        cantidadDisplay.value = nuevoValue; // Actualiza el valor del input
        item.cantidad = nuevoValue;
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado
        console.log(cartItems);
        
        //localStorage.setItem("cantidadArticulos", nuevoValue); // Actualiza la cantidad en localStorage
    }
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(productId) {
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${productId}).value`));
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