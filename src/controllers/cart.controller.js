import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";
import TicketModel from "../models/ticket.model.js";
import { respuesta } from "../utils/reutilizable.js";

const cartService = new CartService();
const productService = new ProductService();

export default class CartController {

    getCarts = async (req, res) => {
        try {
            const carts = await cartService.getCarts();
            return res.status(200).json(carts);
        } catch (error) {
            respuesta(res, 500, "There was an error getting the carts.");
        }
    };

    addCart = async (req, res) => {
        try {
            const cart = await cartService.addCart();
            return res.status(200).json(cart);
        } catch (error) {
            respuesta(res, 500, "There was an error adding a cart.");
        }
    };

    getCartById = async (req, res) => {
        const { id } = req.params;
        try {
            const cart = await cartService.getCartById(id);
            if (!cart) {
                return res.status(404).send("Not found");
            }
            return res.status(200).json(cart);
        } catch (error) {
            respuesta(res, 500, "There was an error getting the cart.");
        }
    };

    deleteCartById = async (req, res) => {
        const { id } = req.params;
        try {
            const cart = await cartService.deleteCartById(id);

            if (!cart) {
                return res.status(404).send("Cart not found");
            }
            return res.status(200).json({ message: "Cart successfully deleted" });
        } catch (error) {
            respuesta(res, 500, "There was an error deleting the cart.");
        }
    };

    updateCart = async (req, res) => {
        const { id } = req.params;
        const { products } = req.body;

        try {
            const cart = await cartService.updateCart(id, { products });
            if (cart === null) {
                return res.status(404).json({ status: false, message: "Cart not found" });
            }
            if (typeof cart === "string") {
                return res.status(404).json({ status: false, message: cart }); 
            }

            return res.status(200).json({ status: true, payload: cart });
        } catch (error) {
            respuesta(res, 500, "There was an error editing the cart.");
        }
    };

    addProductToCart = async (req, res) => {
        const { cid: cartId, pid: productId } = req.params;

        if (!cartId || !productId) {
            return res.status(400).json({ message: "Cart or product not found" });
        }

        try {
            const message = await cartService.addProductToCart(cartId, productId);
            return res.status(200).json({ message });
        } catch (error) {
            respuesta(res, 500, "There was an error adding a product to the cart.");
        }
    };

    deleteProductFromCart = async (req, res) => {
        const { cid: cartId, pid: productId } = req.params;

        if (!cartId || !productId) {
            return res.status(400).json({ message: "Cart or product not found" });
        }

        try {
            const result = await cartService.deleteProductFromCart(cartId, productId);

            if (typeof result === "string") {
                return res.status(404).json({ message: result });
            }

            return res.status(200).json({
                message: "Product successfully deleted",
                updatedCart: result,
            });
        } catch (error) {
            respuesta(res, 500, "There was an error removing a product from the cart.");
        }
    };

    updateCartQuantity = async (req, res) => {
        const { cid: cartId, pid: productId } = req.params;

        if (!cartId || !productId) {
            return res.status(400).json({ message: "Cart or product not found" });
        }

        const { quantity } = req.body;
        if (quantity === undefined || quantity <= 0) {
            return res.status(400).json({ message: "You need to provide a valid quantity." });
        }

        try {
            const result = await cartService.updateCartQuantity(cartId, productId, quantity); 
            if (typeof result === "string") {
                return res.status(404).json({ message: result });
            }

            return res.status(200).json({
                message: "Product quantity updated",
                updatedCart: result,
            });
        } catch (error) {
            respuesta(res, 500, "There was an error updating the quantity.");
        }
    };

    clearCart = async (req, res) => {
        const { cid } = req.params;

        if (!cid) {
            return res.status(400).json({ message: "Cart ID not provided" });
        }

        try {
            const cart = await cartService.clearCart(cid);

            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            return res.status(200).json({
                message: "Cart cleared successfully",
                updatedCart: cart,
            });
        } catch (error) {
            respuesta(res, 500, "There was an error clearing the cart.");
        }
    };

    appGetCarts = async (req, res) => {
        try {
            const carts = await cartService.getCarts();
            res.status(200).render("carts", { title: "Carts", carts });
        } catch (error) {
            respuesta(res, 500, "There was an error getting the carts.");
        }
    };

    appGetCartById = async (req, res) => {
        const { id } = req.params;
        try {
            const cart = await cartService.getCartById(id);
            if (!cart) {
                return res.status(404).send("<h1>Cart not found</h1>");
            }
            res.status(200).render("cartDetail", { title: "Cart Detail", cart: cart });
        } catch (error) {
            respuesta(res, 500, "There was an error getting the cart.");
        }
    };

    appClearCart = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await cartService.clearCart(id);
            if (result === false) {
                return res.status(404).send("<h1>Cart not found</h1>");
            } else if (result === "Error removing products from cart") {
                return res.status(500).send("<h1>Error removing products from cart</h1>");
            }
            res.status(200).redirect(`/carts/${id}`);
        } catch (error) {
            respuesta(res, 500, "There was an error clearing the cart.");
        }
    };

    completePurchase = async (req, res) => {
        const cartId = req.user.cart;
        const userId = req.user.id;
        try {
            const cart = await cartService.getCartById(cartId);
            if (!cart || cart.products.length === 0) {
                return res.status(400).json({ message: "The cart is empty or does not exist." });
            }

            let total = 0;
            const productsPartialSold = [];
            const remainingProducts = [];

            for (const product of cart.products) {
                const stockAvailable = product.id.stock;
                const quantityRequested = product.quantity;

                if (quantityRequested > stockAvailable) {
                    total += product.id.price * stockAvailable;

                    productsPartialSold.push({
                        productId: product.id._id,
                        title: product.id.title,
                        requestedQuantity: quantityRequested,
                        soldQuantity: stockAvailable,
                        remainingQuantity: quantityRequested - stockAvailable,
                    });

                    remainingProducts.push({
                        id: product.id._id,
                        quantity: quantityRequested - stockAvailable,
                    });

                    await productService.updateProduct(product.id._id, { stock: 0 });
                } else {
                    total += product.id.price * quantityRequested;
                    const stockToUpdate = stockAvailable - quantityRequested;
                    await productService.updateProduct(product.id._id, { stock: stockToUpdate });
                }
            }

            if (remainingProducts.length > 0) {
                await cartService.updateCart(cartId, { products: remainingProducts });
            } else {
                await cartService.clearCart(cartId);
            }

            const ticket = new TicketModel({
                amount: total,
                purchaser: userId,
            });

            await ticket.save();

            return res.status(200).json({
                message: "Purchase completed successfully",
                totalAmount: total,
                partiallySoldProducts: productsPartialSold,
                cart: remainingProducts.length > 0 ? remainingProducts : [],
                ticket,
            });

        } catch (error) {
            console.error("Error in completePurchase:", error);
            return res.status(500).json({ message: "There was an error completing the purchase." });
        }
    };
}
