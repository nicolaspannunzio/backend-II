const socket = io();

const addProduct = () => {
    const title = document.getElementById('add-title').value.trim();
    const description = document.getElementById('add-description').value.trim();
    const price = document.getElementById('add-price').value.trim();
    const code = document.getElementById('add-code').value.trim();
    const stock = document.getElementById('add-stock').value.trim();
    const category = document.getElementById('add-category').value.trim();

    if (!title || !description || !price || !code || !stock || !category) {
        alert("Please fill in all fields.");
        return;
    }

    const newProduct = { title, description, price, code, stock, category };
    socket.emit('new-product', newProduct);
};

const updateProduct = () => {
    const id = document.getElementById('update-id').value.trim();
    const title = document.getElementById('update-title').value.trim();
    const description = document.getElementById('update-description').value.trim();
    const price = document.getElementById('update-price').value.trim();
    const code = document.getElementById('update-code').value.trim();
    const stock = document.getElementById('update-stock').value.trim();
    const category = document.getElementById('update-category').value.trim();

    if (!id || !title || !description || !price || !code || !stock || !category) {
        alert("Please fill in all fields.");
        return;
    }

    const updatedProduct = { title, description, price, code, stock, category };
    socket.emit('update-product', { id, updatedProduct });
};

const deleteProduct = (id) => {
    if (typeof id === 'undefined') {
        id = document.getElementById('delete-id').value.trim();
    }
    if (!id) {
        alert("Please enter a product ID.");
        return;
    }
    socket.emit('delete-product', id);
};

document.getElementById('button-add').addEventListener('click', addProduct);
document.getElementById('button-update').addEventListener('click', updateProduct);
document.getElementById('button-delete').addEventListener('click', deleteProduct);

socket.on('realtime', (products) => {
    const productList = document.querySelector('.products-container-rtp');
    productList.innerHTML = ''; 
    products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.id = `product-${product.id}`;
        productElement.innerHTML = `
            <h2>${product.title}</h2>
            <p>Id: ${product.id}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="deleteProduct('${product.id}')">Delete</button>
        `;
        productList.appendChild(productElement);
    });
});

socket.on('error', (errorMessage) => {
    alert(errorMessage);
});
