import { Router } from "express";
import ProductManager from '../class/productManager.js';

const router = Router();
const productManager = new ProductManager();

productManager.loadProducts().then(() => {
}).catch((err) => {
    console.log(err);
});

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        if (limit !== null && (isNaN(limit) || limit <= 0)) {
            return res.status(400).send('The parameter limit must be a positive number.');
        }

        const products = await productManager.getProductList();
        const limitedProducts = limit ? products.slice(0, limit) : products;

        res.json(limitedProducts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getProductById(parseInt(req.params.pid));
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    try {
        await productManager.addProduct(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    try {
        const existingProduct = await productManager.getProductById(parseInt(pid));

        if (!existingProduct) {
            return res.status(404).send("Product not found");
        }

        const updatedProduct = {
            id: parseInt(pid),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        await productManager.updateProduct(parseInt(pid), updatedProduct);

        res.status(203).json({ message: "updated product", updatedProduct });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        await productManager.deleteProduct(parseInt(pid));
        res.status(204).send();
    } catch (error) {
        res.status(404).send(error.message);
    }
});

export default router;