import Bull from 'bull';
import ProductTracker from '../models/ProductTracker';

const scrapeQueue = new Bull('scrapeQueue', { redis: { host: process.env.REDIS_HOST || '127.0.0.1' } });

export async function enqueueHourlyJobs(){
  const trackers = await ProductTracker.find({ enabled: true }).lean();
  for(const t of trackers){
    await scrapeQueue.add('scrape', { trackerId: t._id, productId: t.productId, url: t.productUrl }, { attempts: 3 });
  }
}

export default scrapeQueue;
