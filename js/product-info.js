document.addEventListener('DOMContentLoaded', function () {
    // Verificar si hay una sesión activa
    const sesionActiva = localStorage.getItem("sesionActiva");
    const usuario = localStorage.getItem("usuario");

    // Si la sesión está activa y existe un nombre de usuario, mostrarlo en la barra de navegación
    if (sesionActiva && usuario) {
        document.getElementById('usernameDisplay').textContent = `Bienvenido, ${usuario}`;
    }

    // Recuperar el identificador del producto del almacenamiento local
    const productId = localStorage.getItem('selectedProductId');

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
                const categoryId = productData.category; // Extraer la categoría del producto
                loadRelatedProducts(categoryId, productId); // Llamar a la función para cargar productos relacionados
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



    //Estrellas que se adaptan al comment.score
    function generateStars(score) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                stars += '<span class="star filled"><i class="fa-solid fa-star"></i></span>'; // Estrella llena (icono de FontAwesome)
            } else {
                stars += '<span class="star"><i class="fa-regular fa-star"></i></span>'; // Estrella vacía (icono de FontAwesome)
            }
        }
        return stars;
    }
});


// Función para guardar el ID del producto seleccionado
function saveSelectedProductId(productId) {
    localStorage.setItem('selectedProductId', productId);
}

// Función para cargar productos relacionados
function loadRelatedProducts(categoryId, productId) {
    fetch(`https://japceibal.github.io/emercado-api/cats_products/101.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener productos relacionados: ' + response.status);
            }
            return response.json();
        })
        .then(productsData => {
            const relatedProductsContainer = document.querySelector('.product-list');
            relatedProductsContainer.innerHTML = ''; // Limpiar contenido anterior
            
            // Filtrar productos por la misma categoría, excluyendo el producto actual
            const relatedProducts = productsData.filter(product => product.category === categoryId && product.id !== productId);
            console.log('Related Products:', relatedProducts); // Para verificar los productos
            
            // Mostrar solo los primeros 4 productos relacionados
            relatedProducts.slice(0, 4).forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('related-product');
                productElement.innerHTML = `
                    <a href="product-info.html" onclick="saveSelectedProductId(${product.id})">
                        <img src="img/prod${product.id}_1.jpg" alt="${product.name}" class="img-fluid small-image">
                        <h4>${product.name}</h4>
                        <p>USD ${product.cost}</p>
                    </a>
                `;
                relatedProductsContainer.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error("Error al obtener productos relacionados:", error);
        });
}