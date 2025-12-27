import { Schema, model } from 'mongoose';

const PriceHistorySchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  siteId: { type: Schema.Types.ObjectId, ref: 'TrackedSite' },
  fetchedAt: { type: Date, default: Date.now },
  currency: String,
  price: Number,
  mrp: Number,
  offerPrice: Number,
  availability: String,
  rawResponse: Schema.Types.Mixed
});

PriceHistorySchema.index({ productId: 1, siteId: 1, fetchedAt: 1 });

export default model('PriceHistory', PriceHistorySchema);
