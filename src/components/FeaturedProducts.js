"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      async function fetchProducts() {
         try {
            const response = await fetch(`/api/products?limit=3`);
            if (!response.ok) {
               throw new Error("Failed to fetch products.");
            }
            const data = await response.json();
            setProducts(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      }

      fetchProducts();
   }, []);

   if (loading || error) return 

   return (
      <section className="mt-20 max-w-4xl mx-auto">
         <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Products</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-text-muted">
            {products.map((product) => (
               <Link
                  href={`/products/${product._id}`}
                  key={product.id}
                  className="space-y-4 bg-background-light p-6 min-h-40 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                  aria-label={`View details for ${product.name}`}
               >
                  <h3 className="text-xl md:text-2xl font-semibold">{product.name}</h3>
                  <p>{product.description}</p>
               </Link>
            ))}
         </div>
      </section >
   );
}
