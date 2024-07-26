import express from "express";
import productRoutes from "./routes/products.router.js";
import cartRoutes from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import homeRoute from "./routes/home.router.js";
import { Server } from "socket.io";
import realTimeProductsRoute from "./routes/realTimeProducts.router.js";
import ProductManager from "./class/productManager.js";

const app = express();
const PORT = 8080 || 3000;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/home", homeRoute);
app.use("/realtimeproducts", realTimeProductsRoute);

const httpServer = app.listen(PORT, () => {
  console.log("server ready on port " + PORT);
});

export const socketServer = new Server(httpServer);
const productManager = new ProductManager();

socketServer.on("connection", async (socket) => {
  console.log(`New connected device, ID: ${socket.id}`);
  const productsList = await productManager.getProductList();
  socket.emit("realtime", productsList);
  
  socket.on("new-product", async (product) => {
    const { title, description, price, code, stock, category } = product;
    if (!title || !description || !price || !code || !stock || !category) {
        socket.emit("error", "Invalid product data.");
        return;
    }
    await productManager.addProduct(product);
    const updatedProductsList = await productManager.getProductList();
    socketServer.emit("realtime", updatedProductsList); // Emitir a todos los clientes
  });

  socket.on("update-product", async ({ id, updatedProduct }) => {
    if (!id || !updatedProduct) {
        socket.emit("error", "Invalid product data.");
        return;
    }
    const { title, description, price, code, stock, category } = updatedProduct;
    if (!title || !description || !price || !code || !stock || !category) {
        socket.emit("error", "Invalid product data.");
        return;
    }
    await productManager.updateProduct(Number(id), updatedProduct);
    const updatedProductsList = await productManager.getProductList();
    socketServer.emit("realtime", updatedProductsList); // Emitir a todos los clientes
  });

  socket.on("delete-product", async (id) => {
    if (!id) {
        socket.emit("error", "Invalid product ID.");
        return;
    }
    const result = await productManager.deleteProduct(Number(id));
    if (result) {
        const updatedProductsList = await productManager.getProductList();
        socketServer.emit("realtime", updatedProductsList); // Emitir a todos los clientes
    } else {
        socket.emit("error", "Product not found.");
    }
  });
});