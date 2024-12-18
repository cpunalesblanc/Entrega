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
                            <th scope="col" class='datos-pdtos-cart'>Producto</th>
                            <th scope="col" class='datos-pdtos-cart'>Nombre</th>
                            <th scope="col" class='datos-pdtos-cart'>Cantidad</th>
                            <th scope="col" class='datos-pdtos-cart'>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <th scope="row">
                        <img src="${product.image}" alt="${product.name}" class="w-50">
                    </th>
                    <td>
                        <h2 class='datos-pdtos-cart'>${product.name}</h2>
                    </td>
                    <td>
                        <div class="botoncanti">
                            <button id="menos" onclick="stepper(this, '${product.id}')"> - </button>  
                            <input class="nroCanti" id="canti${product.id}" type="number" min="0" max="100" step="1" value="${product.cantidad}" readonly >
                            <button id="mas" onclick="stepper(this, '${product.id}')"> + </button> 
                        </div>
                    </td>
                    <td id="subtotal${product.id}" class='datos-pdtos-cart'>Precio: ${product.price.toFixed(2)}
                    </td>
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
  let min = parseInt(cantidadDisplay.getAttribute("min"));
  let max = parseInt(cantidadDisplay.getAttribute("max"));
  let step = parseInt(cantidadDisplay.getAttribute("step"));
  let val = parseInt(cantidadDisplay.value);
  let calculoStep = (id == "mas") ? step : -step;
  let nuevoValue = val + calculoStep;

  // Verificamos que la nueva cantidad esté dentro de los límites
  if (nuevoValue >= min && nuevoValue <= max) {
      cantidadDisplay.value = nuevoValue; // Actualizamos el valor en el input
      // Buscamos el producto en el carrito y actualizamos la cantidad
      let item = cartItems.find(item => item.id === productId);
      if (item) {
          item.cantidad = nuevoValue; // Actualizamos la cantidad del producto
      }
  }

  // Si la cantidad es 0, eliminamos el producto
  if (nuevoValue === 0) {
      cartItems = cartItems.filter(item => item.id !== productId); // Eliminar producto
      contenedorItem.remove(); // Eliminar fila de la tabla
  }

  // Actualizar total
  actualizarTotal();

  // Guardar los cambios en localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(productId) {
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${productId}).value`));
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.cantidad = nuevaCantidad; // Actualiza la cantidad
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado
        actualizarSubtotal(productId); // Recalcula el subtotal
    };
};

// Actualiza el total de la compra
function actualizarTotal() {
  let subtotal = 0;
  // Recorremos el carrito para calcular el subtotal
  cartItems.forEach(item => {
      subtotal += item.price * item.cantidad; // Sumar la cantidad de cada producto multiplicado por su precio
  });

  // Actualizamos el subtotal en el DOM
  const subtotalElement = document.querySelector('.subtotal p');
  if (subtotalElement) {
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`; // Muestra el subtotal con dos decimales
  };

  // Si hay otros costos adicionales (envío), se actualizan
  actualizarCostos(subtotal);
};

// Función para actualizar costos con el envío
function actualizarCostos(subtotal) {
  let total = subtotal + envio;

  const totalElement = document.querySelector('.total p');
  if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`; // Actualiza el total
  };
};


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
  //Cierra también el modal de forma de pago
  if (event.target == modalPago) {
    modalPago.style.display = "none"; 
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

  sessionStorage.setItem("department", department);
  sessionStorage.setItem("locality", locality);
  sessionStorage.setItem("street", street);
  sessionStorage.setItem("number", number);
  sessionStorage.setItem("corner", corner);

  // Puedes imprimir en consola para comprobar que se ha guardado
  console.log("Dirección de Envío guardada en sessionStorage:");
  console.log(department, locality, street, number, corner);

  // Cerrar el modal después de guardar la dirección
  modalDire.style.display = "none"; // Oculta el modal
}

//Modal para forma de pago
const openModalBtn2 = document.getElementById("openModalBtn2");
const modalPago = document.getElementById("modalPago");
const closeModalPago = document.getElementById("closeBtnPago");
const guardarPago = document.getElementById('guardarPago');

// Abrir el modal cuando el usuario haga clic en el botón
openModalBtn2.onclick = function() {
    modalPago.style.display = "block"; // Muestra el modal
  }

// Cerrar el modal cuando el usuario haga clic en la X
closeModalPago.onclick = function() {
    modalPago.style.display = "none"; // Oculta el modal
  }

//Guardar selección
  guardarPago.addEventListener('click', () => {
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
    const bancoInput = document.getElementById('comprobante-banco');
    const tarjetaInput = document.getElementById('tarjeta-numero');
    if (metodoPago && bancoInput.value || tarjetaInput.value) {
      // Guardar la selección en sessionStorage después de validar
      sessionStorage.setItem('formaPago', metodoPago.value);
      console.log(metodoPago);
      modalPago.style.display = 'none'; // Cerrar el modal 
    } else if (!metodoPago){ //Si no hay seleccion
      return alert ('Debes seleccionar una forma de pago')
    } else if (bancoInput.value==="" || tarjetaInput.value===""){ //Si no se completa el dato
      return alert ('Por favor, completa el campo correspondiente')
    };
  });
  
  //Activa el campo de texto correspondiente cuando se hace click y queda en checked el input radio
//Los campos están inactivos por defecto antes de hacer la selección
function activaInput (){
  const bancoInput = document.getElementById('comprobante-banco');
  const tarjetaInput = document.getElementById('tarjeta-numero');
  if (document.getElementById('banco').checked){ 
    bancoInput.disabled = false; //Se activa el campo de texto
    tarjetaInput.disabled = true; //Se mantiene inactivo
  } else if (document.getElementById('tarjeta').checked){
    bancoInput.disabled = true; ////Se mantiene inactivo
    tarjetaInput.disabled = false; //Se activa el campo de texto
  };
};


// Evento para finalizar la compra
document.getElementById("finalizarCompra").addEventListener("click", function(e) {
    e.preventDefault(); // Prevenir que la página se recargue al hacer clic
  
    // Validación de dirección
    const direccionValida = validarDireccion();
    console.log("Dirección válida:", direccionValida);
    if (!direccionValida) {
      alert("Por favor, completa todos los campos de dirección.");
      return; // Detener el proceso de compra si la dirección no es válida
    }
  
    // Validación de tipo de envío
    const envioValido = validarEnvio();
    console.log("Envío válido:", envioValido);
    if (!envioValido) {
      alert("Por favor, selecciona un tipo de envío.");
      return; // Detener el proceso de compra si no se ha seleccionado el envío
    }
  
    // Validación de productos
    const productosValidos = validarProductos();
    console.log("Productos válidos:", productosValidos);
    if (!productosValidos) {
      alert("La cantidad de los productos debe ser mayor a 0.");
      return; // Detener el proceso de compra si algún producto tiene cantidad inválida
    }
  
    // Validación de forma de pago
    const pagoValido = validarPago();
    console.log("Pago válido:", pagoValido);
    if (!pagoValido) {
      alert("Por favor, selecciona una forma de pago válida.");
      return; // Detener el proceso de compra si no se ha completado la forma de pago
    }
  
    // Si todo está validado correctamente, mostrar un mensaje de éxito y borrar cosas del local storage
    alert("¡Compra exitosa! Gracias por tu compra.");

    localStorage.removeItem("cartItems");
    localStorage.removeItem("tipoEnvio");
    localStorage.removeItem("selectedProductId");
    localStorage.removeItem("catID");

    // Aquí podrías agregar el código para simular el envío de la compra (guardar en la base de datos, etc.)
  });
  
  // Función para validar la dirección
  function validarDireccion() {
    const department = sessionStorage.getItem("department");
    const locality = sessionStorage.getItem("locality");
    const street = sessionStorage.getItem("street");
    const number = sessionStorage.getItem("number");
    const corner = sessionStorage.getItem("corner");
  
    return department && locality && street && number && corner;
  }
  
  // Función para validar el tipo de envío
  function validarEnvio() {
    const tipoEnvio = sessionStorage.getItem("tipoEnvio");
    return tipoEnvio && tipoEnvio !== "Tipo de envío"; // Verifica que no sea el valor predeterminado
  }
  
  // Función para validar la cantidad de los productos
  function validarProductos() {
    return cartItems.every(item => item.cantidad > 0); // Asegura que todas las cantidades sean mayores a 0
  }
  
// Variables globales para los porcentajes de envío
const shippingOptions = {
  "Premium 2 a 5 días (15%)": 0.15,
  "Express 5 a 8 días (7%)": 0.07,
  "Standard 12 a 15 días (5%)": 0.05,
};

// Función para actualizar los costos totales
function actualizarCostos() {
  let subtotal = 0;
  let shippingPercentage = 0;
  let total = 0;

  // Calcular el subtotal basado en los productos del carrito
  cartItems.forEach((item) => {
    subtotal += item.price * item.cantidad;
  });

  // Obtener el tipo de envío seleccionado
  const tipoEnvio = sessionStorage.getItem("tipoEnvio");
  if (tipoEnvio && shippingOptions[tipoEnvio] !== undefined) {
    shippingPercentage = shippingOptions[tipoEnvio];
  }

  const shippingCost = subtotal * shippingPercentage;
  total = subtotal + shippingCost;

  // Mostrar los costos en la página
  document.querySelector(".subtotal p").textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(".resumen .costo-envio").textContent = `Costo de envío: $${shippingCost.toFixed(2)}`;
  document.querySelector(".resumen .total-compra").textContent = `Total: $${total.toFixed(2)}`;
}

// Función para actualizar el subtotal de un producto
function actualizarSubtotal(productId) {
  const item = cartItems.find((item) => item.id === productId);
  const subtotal = item.price * item.cantidad;

  // Actualizar el subtotal del producto en la tabla
  document.getElementById(`subtotal${productId}`).textContent = `$${subtotal.toFixed(2)}`;

  // Actualizar los costos totales
  actualizarCostos();
}

// Función para manejar cambios en el tipo de envío
function cambiarTipoEnvio(option) {
  sessionStorage.setItem("tipoEnvio", option);
  actualizarCostos();
}

// Configurar el cambio de tipo de envío
document.querySelectorAll("#dropdownContent p").forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedOption = event.target.textContent;
    cambiarTipoEnvio(selectedOption);
  });
});

// Inicializar costos cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  if (cartItems.length > 0) {
    actualizarCostos();
  }
});