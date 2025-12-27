import OpenAI from 'openai';
import config from '../config';

const client = new OpenAI({ apiKey: config.openaiKey });

export const openAIPromptTemplate = `System: You are a price prediction assistant. Given structured JSON with price history stats, trend signals and site patterns, output JSON with fields: predictedSaleStart, predictedSaleEnd, expectedDiscountPercent {min,max}, expectedPriceRange {min,max}, confidence (0-1), recommendation (BUY_NOW|WAIT|WATCH), explanation.

User: {payload}`;

export async function generatePrediction(payload: any){
  const sys = 'You are a helpful price-intel assistant. Output JSON only.';
  const resp = await client.chat.completions.create({ model: 'gpt-4o-mini', messages: [{role: 'system', content: sys},{role: 'user', content: JSON.stringify(payload)}], temperature: 0.1, max_tokens: 400 });
  const text = resp.choices?.[0]?.message?.content || '{}';
  try{ return JSON.parse(text); }catch(e){ return { error: 'invalid-json', raw: text }; }
}
