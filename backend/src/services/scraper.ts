import { chromium } from 'playwright';

export async function scrapePage({ url }: { url: string }){
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: 'PriceCompBot/1.0' });
  const page = await context.newPage();
  try{
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const html = await page.content();
    // naive price extraction - look for currency-like tokens
    const match = html.match(/₹\s?[\d,]+(\.\d+)?|\$\s?[\d,]+(\.\d+)?/);
    const price = match ? Number(match[0].replace(/[^\d.]/g, '')) : null;
    await browser.close();
    return { price, mrp: null, availability: null, raw: { htmlSnippet: html.slice(0, 500) } };
  }catch(err){
    await browser.close();
    throw err;
  }
}
