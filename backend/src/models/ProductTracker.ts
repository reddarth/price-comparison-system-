import { Schema, model } from 'mongoose';

const ProductTrackerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  siteId: { type: Schema.Types.ObjectId, ref: 'TrackedSite' },
  productUrl: String,
  targetPrice: Number,
  currency: String,
  enabled: { type: Boolean, default: true },
  lastNotifiedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default model('ProductTracker', ProductTrackerSchema);
