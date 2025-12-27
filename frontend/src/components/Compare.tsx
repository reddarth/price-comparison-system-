import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Compare({ productIds }: { productIds: string[] }){
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{ (async ()=>{
    const all = await Promise.all(productIds.map(id => axios.get(`/api/products/${id}/prices`).then(r=>({ id, prices: r.data.prices }))));
    setItems(all);
  })(); }, [productIds]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Compare</h2>
      <div className="overflow-auto mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              {items.map(it => <th key={it.id} className="px-4 py-2">{it.id}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Latest Price</td>
              {items.map(it => <td key={it.id} className="border px-4 py-2">{it.prices?.[0]?.price ?? '-'}</td>)}
            </tr>
            <tr>
              <td className="border px-4 py-2">Availability</td>
              {items.map(it => <td key={it.id} className="border px-4 py-2">{it.prices?.[0]?.availability ?? '-'}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
