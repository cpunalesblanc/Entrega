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
                    contenerdorComentarios.innerHTML += `
                    <div class="comentario">
                    <p class="comentarioUser">${comment.user}: ${comment.description}</p>
                    <p class="comentarioDateTime">${comment.dateTime}</p>
                    <p class="comentarioScore">${comment.score}</p>
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


});
