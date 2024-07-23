const socket = io();

const updateProductList = (products) => {
    const productList = document.querySelector('.products-container-home');
    productList.innerHTML = ''; 
    products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.id = `product-${product.id}`;
        productElement.innerHTML = `
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
        `;
        productList.appendChild(productElement);
    });
};

socket.on('realtime', (products) => {
    updateProductList(products);
});