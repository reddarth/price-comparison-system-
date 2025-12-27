import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  title: String,
  normalizedTitle: String,
  images: [String],
  brand: String,
  model: String,
  meta: Schema.Types.Mixed,
  primaryIdentifiers: { upc: String, sku: String, ean: String, asin: String },
  createdAt: { type: Date, default: Date.now }
});

export default model('Product', ProductSchema);
