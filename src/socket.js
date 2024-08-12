import { Server } from "socket.io";
import ProductManager from "./class/productManager.js";

export const initializeSocket = (httpServer) => {
  const socketServer = new Server(httpServer);
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
      socketServer.emit("realtime", updatedProductsList);
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
      socketServer.emit("realtime", updatedProductsList);
    });

    socket.on("delete-product", async (id) => {
      if (!id) {
        socket.emit("error", "Invalid product ID.");
        return;
      }
      const result = await productManager.deleteProduct(Number(id));
      if (result) {
        const updatedProductsList = await productManager.getProductList();
        socketServer.emit("realtime", updatedProductsList);
      } else {
        socket.emit("error", "Product not found.");
      }
    });
  });

  return socketServer;
};