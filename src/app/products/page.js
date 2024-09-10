"use client";
import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';
import React, { useEffect, useMemo, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(true);

  const options = useMemo(() => {
    const brands = [...new Set(products.map(product => product.brand))];
    const categories = [...new Set(products.map(product => product.category))];
    return { brands, categories };
  }, [products]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error('Failed to load products.', {
          position: "top-center",
          theme: "dark"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-text-muted" />
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-background-light text-text px-3 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <Filter products={products} options={options} setFilteredProducts={setFilteredProducts} />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 gap-6">
        {filteredProducts.length > 0 ? (
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
