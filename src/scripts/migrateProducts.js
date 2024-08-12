import fs from 'fs/promises';
import mongoose from 'mongoose';
import connectDB from '../db.js';
import { productModel } from '../models/product.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrateProducts = async () => {
  try {
    await connectDB();

    const dataPath = path.join(__dirname, '../data/products.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const parsedData = JSON.parse(data);
    const products = parsedData.data;

    if (!Array.isArray(products)) {
      throw new Error('Products data is not an array');
    }

    for (const product of products) {
      await productModel.updateOne(
        { code: product.code },
        { $set: product },
        { upsert: true }
      );
    }

    console.log('Products migrated successfully.');
  } catch (error) {
    console.error('Error migrating products:', error.message || error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

migrateProducts();