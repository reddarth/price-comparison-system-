import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config';
import productsRouter from './routes/products';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

app.get('/api/health', (req, res) => res.json({ ok: true }));

async function start(){
  await mongoose.connect(config.mongoUri);
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Backend listening on ${port}`));
}

start().catch(err => { console.error(err); process.exit(1); });
