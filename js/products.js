document.addEventListener("DOMContentLoaded", function() {
    fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then(response => response.json())
        .then(data => {
            showProducts(data.products);
        })
        
});

function showProducts(products) {
    const container = document.querySelector(".card-container");
    container.innerHTML = ""; 

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("card");

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h1>${product.name}</h1>
            <p class>${product.description}</p class>
           <p class="cost">$${product.cost}</p>
            <p class="sold-count">${product.soldCount} ventas</p>
        `;

        container.appendChild(productElement);
    });
}