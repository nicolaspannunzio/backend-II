import { Router } from "express";
import ProductManager from '../class/productManager.js';
import path from 'path';
import { __dirname } from '../utils.js';

const router = Router();
const productManager = new ProductManager(path.join(__dirname, 'data', 'products.json'));

router.get('/', async (req, res) => {
  try {
      const products = await productManager.getProductList();
      res.render('home', { products });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

export default router;