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
            <h2>${product.name}</h2>
            <p1>${product.description}</p1>
            <p2>$${product.cost}</p2>
            <p3> ${product.soldCount} ventas </p3>
        `;

        container.appendChild(productElement);
    });
}