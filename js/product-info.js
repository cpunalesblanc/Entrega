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
     // ** Nueva función para cargar productos relacionados **
    function cargarProductosRelacionados(categoria) {
        fetch(`https://japceibal.github.io/emercado-api/${products}.json`)
            .then(response => response.json())
            .then(allProducts => {
                const productosRelacionados = allProducts.filter(producto => producto.category === categoria && producto.id !== productId);
                console.log('Productos relacionados encontrados:', productosRelacionados);
                mostrarProductosRelacionados(productosRelacionados);
            })
            .catch(error => {
                console.error("Error al obtener productos relacionados:", error);
            });
    }

    // ** Nueva función para mostrar los productos relacionados en la página **
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
                <img src="img/prod${producto.id}_1.jpg" alt="${producto.name}" class="img-fluid">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <button onclick="verProducto(${producto.id})">Ver Producto</button>
            `;

            contenedor.appendChild(div);
        });
    }

    // ** Nueva función para redirigir a la página del producto seleccionado **
    function verProducto(id) {
        localStorage.setItem('selectedProductId', id);
        window.location.href = `product-info.html?id=${id}`; // Cambia esto si la ruta es diferente
    }
});
