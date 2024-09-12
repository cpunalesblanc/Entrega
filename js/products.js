document.addEventListener("DOMContentLoaded", function() {
    fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
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