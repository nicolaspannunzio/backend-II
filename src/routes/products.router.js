import { Router } from "express";
import { productModel } from '../models/product.model.js'; 

const router = Router();

router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : null;
        const query = req.query.query || null;
        const category = req.query.category ? req.query.category.trim() : null;
        const available = req.query.available ? JSON.parse(req.query.available) : null;

        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ status: "error", message: "Invalid 'limit' parameter. It must be a positive integer." });
        }

        if (isNaN(page) || page <= 0) {
            return res.status(400).json({ status: "error", message: "Invalid 'page' parameter. It must be a positive integer." });
        }

        let filter = {};
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        if (category) {
            filter.category = category;
        }
        if (available !== null) {
            filter.status = available;
        }

        const options = {
            limit,
            page,
            sort: sort ? { price: sort } : null,
            lean: true
        };

        const products = await productModel.paginate(filter, options);

        if (!products.docs.length) {
            return res.status(404).json({ status: "error", message: "No products found" });
        }

        const result = {
            products: products.docs,
            previousPage: products.prevPage,
            nextPage: products.nextPage,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage
        };

        res.render('home', result);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ status: "error", message: "An internal server error occurred." });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).lean();
        if (product) {
            res.render('productDetails', { product });
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;

    try {
        const newProduct = await productModel.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/:pid", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid, {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }, { new: true });

        if (updatedProduct) {
            res.status(203).json({ message: "updated product", updatedProduct });
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.pid);
        if (deletedProduct) {
            res.status(204).send();
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;