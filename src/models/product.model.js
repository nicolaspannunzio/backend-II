import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  thumbnail: {
    type: String,
    trim: true
  },
  code: {
    type: String, 
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: Boolean, 
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  thumbnails: {
    type: [String], 
    required: true
  },
  id: {
    type: Number, 
    required: true
  }
}, { timestamps: true });

ProductSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, ProductSchema);