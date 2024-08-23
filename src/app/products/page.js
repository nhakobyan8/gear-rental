"use client";
import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';
import React, { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = useMemo(() => {
    const brands = [...new Set(products.map(product => product.brand))];
    const categories = [...new Set(products.map(product => product.category))];
    return { brands, categories };
  }, [products]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background-light text-text px-3 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <Filter products={products} options={options} setFilteredProducts={setFilteredProducts} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-background p-6 rounded-lg animate-fade-in-up shadow-lg">
              <Skeleton height={200} />
              <Skeleton count={2} style={{ marginTop: '1rem' }} />
            </div>
          ))
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="text-center text-lg">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Products;
