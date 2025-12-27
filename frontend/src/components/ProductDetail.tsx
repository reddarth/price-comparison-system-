import React, { useEffect, useState } from 'react';
import axios from 'axios';

type PricePoint = { date: string; price: number };

export default function ProductDetail({ productId }: { productId: string }){
  const [product, setProduct] = useState<any>(null);
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(()=>{ (async ()=>{
    const { data } = await axios.get(`/api/products/${productId}`);
    setProduct(data.product);
    const ph = await axios.get(`/api/products/${productId}/prices`);
    setPrices(ph.data.prices || []);
  })(); }, [productId]);

  if(!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold">Latest prices</h2>
          <ul>
            {prices.map((p:any,i)=> (
              <li key={i} className="border p-2 rounded my-2">
                <div>Price: {p.price}</div>
                <div>MRP: {p.mrp}</div>
                <div>Availability: {p.availability}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Actions</h2>
          <button className="bg-blue-600 text-white px-3 py-2 rounded">Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
}
