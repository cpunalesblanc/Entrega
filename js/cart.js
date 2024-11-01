const myInput = document.getElementById("canti");
function stepper(btn){
    let id = btn.getAttribute("id");
    let min = myInput.getAttribute("min");
    let max = myInput.getAttribute("max");
    let step = myInput.getAttribute("step");
    let val = myInput.getAttribute("value");
    let calculoStep= (id == "mas") ? (step*1): (step * -1)
    let nuevoValue = parseInt(val) + calculoStep;

    if(nuevoValue >= min && nuevoValue <= max){
        myInput.setAttribute("value", nuevoValue);

    }
}

const productId = localStorage.getItem('selectedProductId');
if (productId) {
    // Hacer una solicitud a la API con el identificador del producto
    fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
        .then(response => response.json())
        .then(productData => {
            // Mostrar la información del producto en la página
            document.querySelector('.nombre-producto').textContent = productData.name;
            document.querySelector('.precio').textContent = `$${productData.cost}`;
            // Mostrar la imagen principal desde la carpeta local 'img'
            const imageFolderPath = 'img/';
            document.querySelector('.foto').innerHTML = `<img src="${imageFolderPath}prod${productId}_1.jpg" alt="Imagen del producto" class="img-fluid main-image">`;        })
        .catch(error => {
            console.error("Error al obtener la información del producto:", error);
        });
} else {
    console.error("No se encontró el ID del producto en el almacenamiento local.");
}