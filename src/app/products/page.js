"use client";
import ProductCard from '@/components/ProductCard';
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const text = await response.text();

        // Проверьте, что тело не пустое перед попыткой распарсить его
        if (!text) {
          throw new Error('Received empty response from server');
        }

        const data = JSON.parse(text); // или используйте response.json() напрямую, если текст не пустой
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }


    fetchProducts();
  }, []);

  const filteredProducts = React.useMemo(() => {
    return products
      .filter(product =>
        (selectedCategory === '' || product.category === selectedCategory) &&
        (selectedBrand === '' || product.brand === selectedBrand)
      )
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        return 0; // default sort order
      });
  }, [products, selectedCategory, selectedBrand, sortOrder]);

  return (
    <div className="min-h-screen bg-background-light text-text px-3 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="mb-8 flex space-y-3 flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4">
          <select
            className="bg-background p-2 rounded text-text-muted"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Select Category"
          >
            <option value="">All Categories</option>
            <option value="Microphones">Microphones</option>
            <option value="Mixers">Mixers</option>
            <option value="Headphones">Headphones</option>
          </select>

          <select
            className="bg-background p-2 rounded text-text-muted"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            aria-label="Select Brand"
          >
            <option value="">All Brands</option>
            <option value="Brand A">Brand A</option>
            <option value="Brand B">Brand B</option>
            <option value="Brand C">Brand C</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <select
            className="bg-background p-2 rounded text-text-muted"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort Products"
          >
            <option value="default">Sort by Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <div className="text-center text-lg">Loading products...</div>
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
