const myInput = document.getElementById("canti");
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Obtener todos los productos en el carrito


document.addEventListener('DOMContentLoaded', function () {
    

    if (cartItems.length > 0) {
        // Iterar sobre cada producto y mostrarlo
        cartItems.forEach(product => {
            const productoDiv = document.createElement('div');
            const contenedorDiv = document.getElementById('itemsCarrito')
            productoDiv.classList.add('productos');
            productoDiv.innerHTML = `
                <table class="table" id="table${product.id}">
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
                            <button id="menos" onclick="stepper(this, '${product.id}')"> - </button>  
                            <input id="canti${product.id}" type="number" min="0" max="100" step="1" value="${product.cantidad}" readonly >
                            <button id="mas" onclick="stepper(this, '${product.id}')"> + </button> 
                        </div>
                    </td>
                    <td id="subtotal${product.id}">Precio: $${product.price.toFixed(2)}
                    <td>
                    </tr>
                </tbody>
                </table>
            `;
            contenedorDiv.appendChild(productoDiv);
            actualizarSubtotal(product.id);
        });

        // Inicializar subtotal
        actualizarTotal()
        
    } else {
        console.error("No se encontraron productos en el carrito.");
    }
});

function stepper(btn, productId) {
    let cantidadDisplay = document.getElementById(`canti${productId}`);
    let contenedorItem = document.getElementById(`table${productId}`);
    let id = btn.getAttribute("id");
    let min = cantidadDisplay.getAttribute("min");
    let max = cantidadDisplay.getAttribute("max");
    let step = cantidadDisplay.getAttribute("step");
    let val = parseInt(cantidadDisplay.value);
    let calculoStep = (id == "mas") ? (parseInt(step)) : (parseInt(step) * -1);
    let nuevoValue = val + calculoStep;
    let item = cartItems.find(item => item.id === productId);
    let itemIndex = cartItems.findIndex(item => item.id === productId);
    val = item.cantidad;

    if (nuevoValue > min && nuevoValue <= max) {
        cantidadDisplay.value = nuevoValue; // Actualiza el valor del input
        item.cantidad = nuevoValue;
        actualizarSubtotal(productId);
    } else if (nuevoValue === 0) {
        cartItems = cartItems.toSpliced(itemIndex, 1);
        contenedorItem.innerHTML = ``;
    }
    actualizarTotal();
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(productId) {
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${productId}).value`));
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.cantidad = nuevaCantidad; // Actualiza la cantidad
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado
        actualizarSubtotal(productId); // Recalcula el subtotal
    }
}

// Actualizar subtotal

function actualizarTotal(){
    let subtotal = 0;
    
    cartItems.forEach(item => {
        subtotal += item.price * item.cantidad; // Sumar al subtotal
    });

    document.querySelector('.subtotal p').textContent = subtotal.toFixed(2); // Mostrar subtotal
}

function actualizarSubtotal(productId) {
    let subtotal = 0;
    const item = cartItems.find(item => item.id === productId);
    subtotal = item.price * item.cantidad; // Sumar al subtotal

    document.getElementById(`subtotal${productId}`).textContent = subtotal.toFixed(2); // Mostrar subtotal
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
document.getElementById("dropdownButton").addEventListener("click", function() {
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("visible");
    dropdownContent.classList.toggle("hidden");
});

function selectOption(option) {
    // Muestra la opción seleccionada y la guarda en localStorage
    sessionStorage.setItem("tipoEnvio", option);

    // Oculta el menú desplegable
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.add("hidden");
    dropdownContent.classList.remove("visible");
}
// Obtener el modal y el botón de abrir
const modalDire = document.getElementById("addressModalDire");
const openModalBtn = document.getElementById("openModalBtn");
// Obtener el botón de cerrar (la X)
const closeModalBtn = document.getElementsByClassName("close-btn")[0];

// Abrir el modal cuando el usuario haga clic en el botón
openModalBtn.onclick = function() {
  modalDire.style.display = "block"; // Muestra el modal
}

// Cerrar el modal cuando el usuario haga clic en la X
closeModalBtn.onclick = function() {
  modalDire.style.display = "none"; // Oculta el modal
}

// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.onclick = function(event) {
  if (event.target == modalDire) {
    modalDire.style.display = "none"; // Si se hace clic fuera del modal, se cierra
  }
}

// Manejar el envío del formulario de dirección de envío
document.getElementById("addressForm").onsubmit = function(event) {
  event.preventDefault(); // Prevenir la acción predeterminada del formulario (evita recargar la página)

  // Obtener los valores de los campos del formulario
  const department = document.getElementById("department").value;
  const locality = document.getElementById("locality").value;
  const street = document.getElementById("street").value;
  const number = document.getElementById("number").value;
  const corner = document.getElementById("corner").value;

  // Guardar los datos en sessionStorage
  sessionStorage.setItem("department", department);
  sessionStorage.setItem("locality", locality);
  sessionStorage.setItem("street", street);
  sessionStorage.setItem("number", number);
  sessionStorage.setItem("corner", corner);

  // Puedes imprimir en consola para comprobar que se ha guardado
  console.log("Dirección de Envío guardada en sessionStorage:");
  console.log(department, locality, street, number, corner);

  // Cerrar el modal después de guardar la dirección
  modal.style.display = "none"; // Oculta el modal
}

//Modal para forma de pago
const openModalBtn2 = document.getElementById("openModalBtn2");
const modalPago = document.getElementById("modalPago");
const closeModalPago = document.getElementById("closeBtnPago");

// Abrir el modal cuando el usuario haga clic en el botón
openModalBtn2.onclick = function() {
    modalPago.style.display = "block"; // Muestra el modal
  }

// Cerrar el modal cuando el usuario haga clic en la X
closeModalPago.onclick = function() {
    modalPago.style.display = "none"; // Oculta el modal
  }
// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == modalPago) {
      modalPago.style.display = "none"; // Si se hace clic fuera del modal, se cierra
    }
  }
