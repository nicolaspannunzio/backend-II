import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const productSubSchema = new Schema({
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true
  }
}, { _id: false });

const cartSchema = new Schema({
  id: {
    type: String,
    required: false,
  },
  products: {
    type: [productSubSchema],
    default: []
  },
}, { timestamps: true });

export const cartModel = mongoose.model(cartCollection, cartSchema);