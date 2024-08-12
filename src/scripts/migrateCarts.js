import mongoose from 'mongoose';
import { cartModel } from '../models/cart.model.js'; 
import cartsData from '../data/carts.json';

async function migrateCarts() {
  try {
    await mongoose.connect(process.env.DB_URI);

    const carts = cartsData.data;

    const formattedCarts = carts.map(cart => ({
      products: cart.products.map(p => ({
        product: mongoose.Types.ObjectId(p.product),
        quantity: p.quantity
      }))
    }));

    await cartModel.insertMany(formattedCarts);

    console.log('Carts migrated successfully!');
  } catch (error) {
    console.error('Error migrating carts', error);
  } finally {
    mongoose.disconnect();
  }
}

migrateCarts();