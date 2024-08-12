import { Router } from "express";
import { cartModel } from "../models/cart.model.js";
import { CartManager } from "../class/cartManager.js";
import { __dirname } from "../utils.js";
import path from "path";

const router = Router();
const cartManager = new CartManager(path.join(__dirname, "data", "carts.json"));

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid).populate('products.product');

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const products = cart.products.map(p => ({
            productId: p.product._id,
            quantity: p.quantity,
            productDetails: {
                name: p.product.name,
                price: p.product.price,
            }
        }));

        res.render("cartDetails", { cartId: cart._id, products });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        res.status(500).send("An internal server error occurred.");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartManager.addProductToCart(
      parseInt(cid),
      parseInt(pid)
    );
    res.status(201).json(updatedCart);
  } catch (error) {
    console.error("Error in addProductToCart:", error);
    res.status(500).send(error.message);
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartManager.deleteProductFromCart(
      parseInt(cid),
      parseInt(pid)
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { data } = req.body;

  const cartId = parseInt(cid);
  if (isNaN(cartId)) {
      return res.status(400).send("Invalid cart ID. It must be a number.");
  }

  if (!Array.isArray(data)) {
      return res.status(400).send("Invalid request body. 'data' must be an array.");
  }

  for (const cart of data) {
      if (typeof cart.id !== 'number' || isNaN(cart.id)) {
          return res.status(400).send(`Invalid cart ID: ${cart.id}. It must be a number.`);
      }
      if (cart.products && !Array.isArray(cart.products)) {
          return res.status(400).send(`Invalid products array for cart ID ${cart.id}. It must be an array.`);
      }
      if (cart.products) {
          for (const product of cart.products) {
              if (typeof product.id !== 'number' || isNaN(product.id)) {
                  return res.status(400).send(`Invalid product ID: ${product.id}. It must be a number.`);
              }
              if (typeof product.quantity !== 'number' || isNaN(product.quantity)) {
                  return res.status(400).send(`Invalid product quantity: ${product.quantity}. It must be a number.`);
              }
          }
      }
  }

  try {
      const existingCart = await cartManager.getCartById(cartId);
      if (!existingCart) {
          return res.status(404).send(`Cart with ID ${cartId} not found.`);
      }

      const updatedCarts = [];
      for (const cart of data) {
          if (cart.id === cartId || cartId === -1) {
              const updatedCart = await cartManager.updateCartProducts(cart.id, cart.products || []);
              if (updatedCart) {
                  updatedCarts.push(updatedCart);
              } else {
                  return res.status(404).send(`Cart with ID ${cart.id} not found.`);
              }
          }
      }

      res.json({
          status: "success",
          payload: updatedCarts
      });
  } catch (error) {
      console.error("Error updating carts:", error); 
      res.status(500).send("An internal server error occurred.");
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 0) {
      return res.status(400).send("Invalid quantity. It must be a non-negative number.");
  }

  try {
      const cart = await cartManager.getCartById(parseInt(cid));
      if (!cart) {
          return res.status(404).send(`Cart with ID ${cid} not found.`);
      }

      const product = cart.products.find(p => p.id === parseInt(pid));
      if (!product) {
          return res.status(404).send(`Product with ID ${pid} not found in cart.`);
      }

      const updatedCart = await cartManager.updateProductQuantity(parseInt(cid), parseInt(pid), parseInt(quantity));

      res.json(updatedCart);
  } catch (error) {
      console.error("Error updating product quantity:", error);
      res.status(500).send("An internal server error occurred.");
  }
});

router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
      const cart = await cartManager.getCartById(parseInt(cid));
      if (!cart) {
          return res.status(404).send(`Cart with ID ${cid} not found.`);
      }

      cart.products = [];
      await cartManager.saveCarts();

      res.json(cart);
  } catch (error) {
      console.error("Error deleting products from cart:", error);
      res.status(500).send("An internal server error occurred.");
  }
});

export default router;