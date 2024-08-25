import React, { useState, useEffect, useMemo } from 'react';

const Filter = ({ products, setFilteredProducts, options }) => {
   const [selectedCategory, setSelectedCategory] = useState('');
   const [selectedBrand, setSelectedBrand] = useState('');
   const [sortOrder, setSortOrder] = useState('default');

   const filteredProducts = useMemo(() => {
      return products
         .filter(product =>
            (selectedCategory === '' || product.category === selectedCategory) &&
            (selectedBrand === '' || product.brand === selectedBrand)
         )
         .sort((a, b) => {
            if (sortOrder === 'price-asc') return a.price - b.price;
            if (sortOrder === 'price-desc') return b.price - a.price;
            return 0;
         });
   }, [products, selectedCategory, selectedBrand, sortOrder]);

   useEffect(() => {
      setFilteredProducts(filteredProducts);
   }, [filteredProducts, setFilteredProducts]);

   return (
      <div className="flex space-y-3 flex-col md:flex-row justify-between items-center mb-8">
         <div className="flex space-x-4">
            <select
               className="bg-background p-2 rounded text-text-muted"
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               aria-label="Filter by Category"
            >
               <option value="">All Categories</option>
               {options.categories.map((category) => (
                  <option key={category} value={category}>
                     {category}
                  </option>
               ))}
            </select>

            <select
               className="bg-background p-2 rounded text-text-muted"
               value={selectedBrand}
               onChange={(e) => setSelectedBrand(e.target.value)}
               aria-label="Filter by Brand"
            >
               <option value="">All Brands</option>
               {options.brands.map((brand) => (
                  <option key={brand} value={brand}>
                     {brand}
                  </option>
               ))}
            </select>
         </div>

         <div className="flex space-x-4">
            <select
               className="bg-background p-2 rounded text-text-muted"
               value={sortOrder}
               onChange={(e) => setSortOrder(e.target.value)}
               aria-label="Sort Products by Price"
            >
               <option value="default">Sort by Default</option>
               <option value="price-asc">Price: Low to High</option>
               <option value="price-desc">Price: High to Low</option>
            </select>
         </div>
      </div>
   );
};

export default Filter;
