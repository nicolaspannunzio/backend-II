import { Router } from 'express';
import { CartManager } from '../class/cartManager.js';
import { __dirname } from '../utils.js';
import path from 'path';

const router = Router();
const cartManager = new CartManager(path.join(__dirname, 'data', 'carts.json'));

// Ruta raíz POST / para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(parseInt(cid));
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).send('Carrito no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta POST /:cid/product/:pid para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;