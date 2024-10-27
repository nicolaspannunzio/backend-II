import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";

class CartService {

    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    getCarts = async() => {
        try {
            const carts = await this.cartRepository.getCarts();
            return carts;
        } catch (error) {
            throw new Error("Error retrieving carts.");
        }
    };

    addCart = async() => {
        try {
            return await this.cartRepository.createCart({ products: [] });
        } catch (error) {
            throw new Error("Error adding a cart.");
        }
    };

    getCartById = async(id) => {
        try {
            const cart = await this.cartRepository.getCartById(id);
            return cart;
        } catch (error) {
            throw new Error("Error retrieving the cart.");
        }
    };

    deleteCartById = async(id) => {
        try {
            return await this.cartRepository.deleteCart(id);
        } catch (error) {
            throw new Error("Error deleting the cart.");
        }
    };

    updateCart = async (id, updateData) => {
        try {
            const cart = await this.cartRepository.getCartById(id);
            if (!cart) {
                return "That ID does not exist";
            }

            cart.products = updateData.products;
            const updatedCart = await this.cartRepository.updateCart(id, cart);

            return updatedCart;
        } catch (error) {
            throw new Error("Error editing the cart: " + error.message);
        }
    };

    addProductToCart = async (cartId, productId) => {
        try {
            const cart = await this.cartRepository.getCartById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }

            const product = await this.productRepository.getProductById(productId);
            if (!product) {
                throw new Error("Product not found");
            }

            const productInCart = cart.products.find((p) => p.id._id.toString() === productId.toString());

            if (productInCart) {
                productInCart.quantity += 1;
                await this.cartRepository.updateCart(cartId, cart);
                return "Quantity increased";
            } else {
                if (product.stock > 0) {
                    cart.products.push({ id: product._id, quantity: 1 });
                    await this.cartRepository.updateCart(cartId, cart);
                    return "Product added";
                } else {
                    throw new Error("No stock available to add the product.");
                }
            }
        } catch (error) {
            throw new Error("Error adding the product to the cart: " + error.message);
        }
    };

    deleteProductFromCart = async (cartId, productId) => {
        try {
            const cart = await this.cartRepository.getCartById(cartId);
            if (!cart) {
                return "Cart not found";
            }

            const productIndex = cart.products.findIndex((p) => p.id._id.toString() === productId.toString());

            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
                return await this.cartRepository.updateCart(cartId, cart);
            } else {
                return "Product not found in the cart";
            }
        } catch (error) {
            throw new Error("Error removing the product from the cart.");
        }
    };

    updateCartQuantity = async (cartId, productId, quantity) => {
        try {
            const cart = await this.cartRepository.getCartById(cartId);

            if (!cart) {
                return "Cart not found";
            }

            const productIndex = cart.products.findIndex((p) => p.id._id.toString() === productId.toString());

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                return await this.cartRepository.updateCart(cartId, cart);
            } else {
                return "Product not found in the cart";
            }
        } catch (error) {
            throw new Error("Error updating the product quantity.");
        }
    };

    clearCart = async (cartId) => {
        try {
            const cart = await this.cartRepository.getCartById(cartId);
            if (!cart) {
                return false;
            }
            cart.products = [];
            return await this.cartRepository.updateCart(cartId, cart);
        } catch (error) {
            throw new Error("Error clearing the cart.");
        }
    };
}

export default CartService;
