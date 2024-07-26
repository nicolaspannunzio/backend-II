const socket = io();

const updateProductList = (products) => {
    const productList = document.querySelector('.container-products');
    productList.innerHTML = ''; 
    if (products.length) {
        const ul = document.createElement('ul');
        products.forEach((product) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h2>${product.title}</h2>
                <p>Description: ${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Id: ${product.id}</p>
            `;
            ul.appendChild(li);
        });
        productList.appendChild(ul);
    } else {
        productList.innerHTML = '<p>No products available</p>';
    }
};

socket.on('realtime', (products) => {
    updateProductList(products);
});
