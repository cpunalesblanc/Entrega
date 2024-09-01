document.addEventListener("DOMContentLoaded", function() {
    fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then(response => response.json())
        .then(data => {
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