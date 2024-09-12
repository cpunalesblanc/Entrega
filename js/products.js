document.addEventListener("DOMContentLoaded", function() {
    fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then(response => response.json())
        .then(data => {
            dataProducts = data.products;

            showProducts(data.products);
        });
});

function showProducts(products) {
    const container = document.querySelector(".card-container");
    container.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("col-lg-4", "col-md-6", "col-12"); // Asegúrate de que estas clases estén presentes

        productElement.innerHTML = `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <p class="cost">$${product.cost}</p>
                <p class="sold-count">${product.soldCount} ventas</p>
            </div>
        `;

        container.appendChild(productElement);
    });
}

// Barra de busqueda por nombre y descripción
const searchInput = document.getElementById("searchInput").value;
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    // filtrar por productos que contengan searchInput en name o description
    //showProducts(incluyeAlguna(dataProducts, searchInput));
    const arraySearch = dataProducts.filter((element) => dataProducts[element].name.includes(searchInput) || dataProducts[element].description.includes(searchInput))
    showProducts(arraySearch);
});

// https://es.stackoverflow.com/questions/525062/como-filtrar-dos-o-mas-palabras-en-una-cadena-de-texto-en-js

function incluyeAlguna(original, buscadas) {
   //original.forEach((element) => {
   //     buscadas.split(' ')
   //     .some(p => original[element].name.includes(p) || original[element].description.includes(p))
   // });



}