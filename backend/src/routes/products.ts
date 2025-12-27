import { Router } from 'express';
import Product from '../models/Product';
import ProductTracker from '../models/ProductTracker';
import PriceHistory from '../models/PriceHistory';

const router = Router();

// Import product by URL - minimal: store url as tracker+product
router.post('/import', async (req, res) => {
  const { url, title } = req.body;
  if (!url) return res.status(400).json({ error: 'url required' });
  const product = await Product.create({ title: title || url });
  // create a placeholder tracker if requested
  res.json({ success: true, product });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ error: 'not found' });
  // return basic combined data
  const trackers = await ProductTracker.find({ productId: product._id }).lean();
  res.json({ product, trackers });
});

// latest prices by site
router.get('/:id/prices', async (req, res) => {
  const productId = req.params.id;
  const latest = await PriceHistory.aggregate([
    { $match: { productId: (await Product.findById(productId))._id } },
    { $sort: { fetchedAt: -1 } },
    { $group: { _id: '$siteId', doc: { $first: '$$ROOT' } } },
    { $replaceRoot: { newRoot: '$doc' } }
  ]).exec();
  res.json({ prices: latest });
});

export default router;
