document.addEventListener('DOMContentLoaded', function () {
    // Verificar si hay una sesión activa
    //const sesionActiva = localStorage.getItem("sesionActiva");
    //const usuario = localStorage.getItem("usuario");

    // Si la sesión está activa y existe un nombre de usuario, mostrarlo en la barra de navegación
    //if (sesionActiva && usuario) {
      //  document.getElementById('usernameDisplay').textContent = `Bienvenido, ${usuario}`;
    //}

    //-----------TERMINA USUARIO EN BARA DE NAVEGACION----------------------------

    // Recuperar el identificador del producto del almacenamiento local
    const productId = localStorage.getItem('selectedProductId');


    document.getElementById("btn-volver-listado").addEventListener("click", function() {
        window.location.href = "products.html"; // Redirige a products.html
    });

    // Verificar si el productId existe en el almacenamiento local
    if (productId) {
        // Hacer una solicitud a la API con el identificador del producto
        fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
            .then(response => response.json())
            .then(productData => {
                // Mostrar la información del producto en la página
                document.querySelector('.nombre-producto').textContent = productData.name;
                document.querySelector('.categoria-producto').textContent = productData.category;
                document.querySelector('.cantidad-vendida').textContent = `${productData.soldCount} ventas`;
                document.querySelector('.desc').textContent = productData.description;
                document.querySelector('.precio').textContent = `$${productData.cost}`;

                // Mostrar la imagen principal desde la carpeta local 'img'
                const imageFolderPath = 'img/';
                document.querySelector('.foto').innerHTML = `<img src="${imageFolderPath}prod${productId}_1.jpg" alt="Imagen del producto" class="img-fluid main-image">`;

                // Mostrar las imágenes asociadas desde la carpeta local 'img'
                const imgSmallContainer = document.querySelector('.img-small');
                imgSmallContainer.innerHTML = ''; // Limpiar el contenido anterior

                // Añadir las imágenes 2, 3 y 4 de la carpeta local
                for (let i = 2; i <= 4; i++) {
                    const imgElement = document.createElement('div');
                    imgElement.classList.add('img-asociada');
                    imgElement.innerHTML = `<img src="${imageFolderPath}prod${productId}_${i}.jpg" alt="Imagen asociada ${i}" class="img-fluid small-image">`;
                    imgSmallContainer.appendChild(imgElement);
                }

                // Aquí agregamos el evento para el botón "Comprar"
                document.getElementById('comprar').addEventListener('click', function() {
                // Guardar información del producto en localStorage
                const productToCart = {
                id: productId,
                name: productData.name,
                price: productData.cost,
                image: `${imageFolderPath}prod${productId}_1.jpg`,
                cantidad: 1
            };

                //Cambio para el desafiate
                let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
                const itemExistente = cartItems.find(item => item.id === productToCart.id); 
                console.log(itemExistente);
                if (itemExistente) { // Si el producto ya está en el carrito, actualiza la cantidad 
                    itemExistente.cantidad++; } 
                else { // Si no, agrega el nuevo producto al carrito 
                    cartItems.push(productToCart); 
                } 

                localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado 
                //let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
                //cartItems.push(productToCart);
                //localStorage.setItem('cartItems', JSON.stringify(cartItems));

                console.log(cartItems);
                window.location.href = 'cart.html';
            });
                
                cargarProductosRelacionados(productData.category);
            })
            .catch(error => {
                console.error("Error al obtener la información del producto:", error);
            });

        //Fetch a comentarios  
        fetch(`https://japceibal.github.io/emercado-api/products_comments/${productId}.json`)
            .then(response => response.json())
            .then(commentsData => {
                const contenerdorComentarios = document.getElementById("contenedorComentarios");
                contenerdorComentarios.innerHTML  = "";

                commentsData.forEach(comment => {
                    const stars = generateStars(comment.score);
                    contenerdorComentarios.innerHTML += `
                    <div class="comentario">
                    <p class="comentarioUser"> <b>${comment.user}:</b> ${comment.description}</p>
                    <p class="comentarioDateTime">${comment.dateTime} <span class="comentarioScore">${stars}</span></p>
                    </div>
                    `;

                });
            })
            .catch(error => {
                console.error("Error al obtener la información del producto:", error);
            });

    } else {
        console.error("No se encontró el ID del producto en el almacenamiento local.");
    }
    
    // Evento para el botón de enviar comentario 
document.getElementById('enviarComentario').addEventListener('click', function() {
    const comentarioCaja = document.getElementById('comentarioCaja');
    const comentarioTexto = comentarioCaja.value.trim();

    if (comentarioTexto) {
        // Agregar el comentario a la lista ya existente
        agregarComentario(comentarioTexto);
        comentarioCaja.value = ''; // Limpiar el campo de entrada después de enviar
    } else {
        alert("Por favor, ingresa un comentario.");
    }
});

// Generar estrellas de puntaje
function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += (i <= rating) ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }
    return starsHTML;
}

// Función para agregar comentario
function agregarComentario(comentario) {
    const contenedorComentarios = document.getElementById("contenedorComentarios");
    const nuevoComentarioDiv = document.createElement('div');
    nuevoComentarioDiv.classList.add('comentario');

    const usuario = localStorage.getItem("usuario") || "Usuario Anónimo";
    const stars = generateStars(selectedRating);

    nuevoComentarioDiv.innerHTML = `
        <p class="comentarioUser"><b>${usuario}:</b> ${comentario}</p>
        <p class="comentarioDateTime">${new Date().toLocaleString()} <span class="comentarioScore">${stars}</span></p>
    `;

    contenedorComentarios.appendChild(nuevoComentarioDiv);
}

// Capturar el evento de enviar comentario
document.getElementById("enviarComentario").addEventListener("click", function() {
    const comentario = document.querySelector("textarea").value;
    if (comentario) {
        agregarComentario(comentario);
        document.querySelector("textarea").value = '';
    } else {
        alert("Por favor, ingresa un comentario.");
    }
});

// Puntuación de estrellas
let selectedRating = 0;
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-value');
        actualizarEstrellas(selectedRating);
    });
});

function actualizarEstrellas(rating) {
    document.querySelectorAll('.star').forEach(star => {
        star.innerHTML = (star.getAttribute('data-value') <= rating) ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    });
}



     // ** Nueva función para cargar productos relacionados **
     function cargarProductosRelacionados() {
        fetch(`https://japceibal.github.io/emercado-api/cats_products/101.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta de la API:', data);
                const allProducts = data.products; // Accede al array de productos
    
                // Filtrar productos relacionados
                const productosRelacionados = allProducts.filter(producto => producto.id !== productId); // Filtramos solo por ID
    
                mostrarProductosRelacionados(productosRelacionados);
            })
            .catch(error => {
                console.error("Error al obtener productos relacionados:", error);
            });
    }
    
    function mostrarProductosRelacionados(productosRelacionados) {
        const contenedor = document.querySelector('.product-list');
        contenedor.innerHTML = ''; // Limpiar el contenedor
    
        if (productosRelacionados.length === 0) {
            contenedor.innerHTML = '<p>No hay productos relacionados disponibles.</p>';
            return;
        }
            
        productosRelacionados.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');
    
            div.innerHTML = `
                <img src="${producto.image}" alt="${producto.name}" class="img-fluid">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <button onclick="verProducto(${producto.id})">Ver Producto</button>
            `;
    
            contenedor.appendChild(div);
        });
    }

});

    // ** Nueva función para redirigir a la página del producto seleccionado **
    function verProducto(id) {
        localStorage.setItem('selectedProductId', id);
        window.location.href = `product-info.html?id=${id}`; // Cambia esto si la ruta es diferente
    }

    // Cambio 
function agregarAlCarrito(producto, cantidad) { 
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    const itemExistente = cartItems.find(item => item.id === producto.id); 
    if (itemExistente) { // Si el producto ya está en el carrito, actualiza la cantidad 
        itemExistente.cantidad += cantidad; } 
        else { // Si no, agrega el nuevo producto al carrito 
            producto.cantidad = cantidad; // Asigna la cantidad 
            cartItems.push(producto); } localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda el carrito actualizado 
};

// Dentro del evento de "Comprar"
//let botonComprar = document.getElementById('comprar');
//botonComprar.addEventListener('click', function() {
//    const cantidad = parseInt(document.getElementById('canti').value) || 1; // Obtener cantidad del input
 //   const productToCart = {
//        id: productId,
//        name: productData.name,
  //      price: productData.cost,
   //     image: `${imageFolderPath}prod${productId}_1.jpg`
   // };
    
   // agregarAlCarrito(productToCart, cantidad); // Usar la función para agregar al carrito

    // Navegar a cart.html
   // window.location.href = 'cart.html';
//});
