import { Schema, model } from 'mongoose';

const TrackedSiteSchema = new Schema({
  name: String,
  domain: String,
  userAdded: { type: Boolean, default: false },
  urlTemplate: String,
  selectors: Schema.Types.Mixed,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('TrackedSite', TrackedSiteSchema);
