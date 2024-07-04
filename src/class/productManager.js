import fs from "fs";
import path from "path";
import { __dirname } from "../utils.js";

const dataFolderPath = path.join(__dirname, "data"); 
const productsFilePath = path.join(dataFolderPath, "products.json"); 

class ProductManager {
  constructor(filename = "products.json") {
    this.path = productsFilePath;
    this.productList = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const list = await fs.promises.readFile(this.path, "utf-8");
      const parsedList = JSON.parse(list);
      this.productList = parsedList.data || [];
    } catch (error) {
      this.productList = [];
    }
  }

  async saveProducts() {
    try {
      // Asegurarse de que la carpeta 'data' exista antes de guardar
      await fs.promises.mkdir(dataFolderPath, { recursive: true });
      await fs.promises.writeFile(
        this.path,
        JSON.stringify({ data: this.productList }, null, 2)
      );
    } catch (error) {
      console.error("Error al guardar productos:", error);
    }
  }

  async getProductList() {
    await this.loadProducts();
    return [...this.productList];
  }

  getProductById(id) {
    return this.productList.find((p) => p.id === id);
  }

  async addProduct(product) {
    product.id =
      this.productList.length > 0
        ? this.productList[this.productList.length - 1].id + 1
        : 1;

    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.stock ||
      !product.category
    ) {
      throw new Error("Todos los campos son obligatorios, excepto thumbnails");
    }
    this.productList.push(product); 
    await this.saveProducts(); 
}

  async updateProduct(id, updatedProduct) {
    let productFound = false;
    this.productList = this.productList.map((p) => {
      if (p.id === id) {
        productFound = true;
        return { ...p, ...updatedProduct }; 
      }
      return p;
    });
    if (!productFound) {
      throw new Error("Producto no encontrado");
    }
    await this.saveProducts(); 
  }

  async deleteProduct(id) {
    const initialLength = this.productList.length;
    this.productList = this.productList.filter((p) => p.id !== id); 
    if (this.productList.length === initialLength) {
      throw new Error("Producto no encontrado");
    }
    await this.saveProducts(); 
  }
}

export default ProductManager;
