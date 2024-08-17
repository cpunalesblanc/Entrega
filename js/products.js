document.addEventListener("DOMContentLoaded", function() {
    fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then(response => response.json())
        .then(data => {
            showProducts(data.products);
        })
        .catch(error => {
            console.error("Error al obtener los productos:", error);
        });
});

function showProducts(products) {
    const container = document.querySelector(".card-container");
    container.innerHTML = ""; // Limpiar el contenido anterior

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("card");

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p><strong>Precio:</strong> $${product.cost}</p>
            <p><strong>Cantidad Vendidos:</strong> ${product.soldCount}</p>
        `;

        container.appendChild(productElement);
    });
}