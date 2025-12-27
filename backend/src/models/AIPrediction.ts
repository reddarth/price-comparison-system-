import { Schema, model } from 'mongoose';

const AIPredictionSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  predictedSaleStart: Date,
  predictedSaleEnd: Date,
  expectedDiscountPercent: Schema.Types.Mixed,
  expectedPriceRange: Schema.Types.Mixed,
  confidence: Number,
  recommendation: String,
  explanation: String,
  generatedAt: { type: Date, default: Date.now }
});

export default model('AIPrediction', AIPredictionSchema);
