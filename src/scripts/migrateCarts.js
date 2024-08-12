import fs from 'fs/promises';
import mongoose from 'mongoose';
import connectDB from '../db.js';
import { cartModel } from '../models/cart.model.js';
import { productModel } from '../models/product.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrateCarts = async () => {
  try {
    await connectDB();

    const dataPath = path.join(__dirname, '../data/carts.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const parsedData = JSON.parse(data);
    const carts = parsedData.data;

    if (!Array.isArray(carts)) {
      throw new Error('Carts data is not an array');
    }

    for (const cart of carts) {
      const productsWithObjectIds = [];
      for (const product of cart.products) {
        const foundProduct = await productModel.findOne({ id: product.id }).exec();
        if (foundProduct) {
          productsWithObjectIds.push({
            quantity: product.quantity,
            product: foundProduct._id
          });
        } else {
          console.warn(`Product with id ${product.id} not found`);
        }
      }

      await cartModel.updateOne(
        { id: cart.id },
        { $set: { products: productsWithObjectIds } },
        { upsert: true }
      );
    }

    console.log('Carts migrated successfully.');
  } catch (error) {
    console.error('Error migrating carts:', error.message || error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

migrateCarts();