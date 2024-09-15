document.addEventListener("DOMContentLoaded", function() {
    const categoryId = localStorage.getItem("catID");  // Obtener el identificador de la categoria guardado en el localStorage
    if (!categoryId) {
        console.error("No se ha seleccionado ninguna categoría."); // Verificar si existe el identificador de la categoria y si no mostrar un mensaje o manejar el error
        return;  // Salir de la función si no hay categoría seleccionada
    }

    fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`)  // Solicitar los productos de la categoria seleccionada
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
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
        productElement.addEventListener("click", function()
    {
        localStorage.setItem("selectedProductId", product.id); //guarda el ID del producto
        window.location.href = "product-info.html"; //redirije a priduct-info
    })

        container.appendChild(productElement);
    });
}

   // Filtrar productos por rango de precios
   document.getElementById('filterBtn').addEventListener('click', function() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filteredProducts = productsData.filter(product => product.cost >= minPrice && product.cost <= maxPrice);
    showProducts(filteredProducts);
});

// Ordenar productos por precio o por cantidad de vendidos
document.getElementById('sortOrder').addEventListener('change', function() {
    const sortOrder = this.value;
    let sortedProducts = [...productsData];  // Copiar los productos originales

    if (sortOrder === 'asc') {
        sortedProducts.sort((a, b) => a.cost - b.cost);  // Orden ascendente por precio
    } else if (sortOrder === 'desc') {
        sortedProducts.sort((a, b) => b.cost - a.cost);  // Orden descendente por precio
    } else if (sortOrder === 'soldCount') {
        sortedProducts.sort((a, b) => b.soldCount - a.soldCount);  // Orden descendente por cantidad de ventas
    }

    showProducts(sortedProducts);
});

// Barra de busqueda por nombre y descripción
const searchButton = document.getElementById("searchButton");
const searchInputElement = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
    searchInput = document.getElementById("searchInput").value;
    arraySearch = productsData.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase()) ||
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

searchInputElement.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
