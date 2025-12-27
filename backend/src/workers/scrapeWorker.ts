import scrapeQueue from '../jobs/enqueue';
import { scrapePage } from '../services/scraper';
import PriceHistory from '../models/PriceHistory';

scrapeQueue.process(5, async job => {
  const { productId, url } = job.data;
  try{
    const result = await scrapePage({ url });
    const ph = new PriceHistory({ productId, siteId: null, fetchedAt: new Date(), price: result.price, mrp: result.mrp, availability: result.availability, rawResponse: result.raw });
    await ph.save();
    return Promise.resolve();
  }catch(err){
    console.error('scrape error', err);
    throw err;
  }
});
