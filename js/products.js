document.addEventListener("DOMContentLoaded", function() {
    fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then(response => response.json())
        .then(data => {
            dataProducts = data.products;
            showProducts(data.products);
        });
});
const container = document.querySelector(".card-container");
function showProducts(products) {
    
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

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    searchInput = document.getElementById("searchInput").value;
    arraySearch = dataProducts.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    element.description.toLowerCase().includes(searchInput.toLowerCase()))
    console.log("search");
    if (arraySearch.length == 0){
        container.innerHTML = `<p id="notFound">No se encontraron productos</p>`;
        console.log("search empty");
    } else {
        showProducts(arraySearch);
        console.log("search succesfull");
        console.log(arraySearch);
    }  
});




// busqueda mejor pero no pude hacerla andar: https://es.stackoverflow.com/questions/525062/como-filtrar-dos-o-mas-palabras-en-una-cadena-de-texto-en-js
