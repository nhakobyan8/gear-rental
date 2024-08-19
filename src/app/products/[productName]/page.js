"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/features/cartSlice";

const SinglePage = () => {
  const pathname = usePathname();
  const productName = pathname.split('/').pop(); // Извлекаем имя продукта из URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?name=${productName}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setProduct(data);
          } else {
            setError('Product not found');
          }
        } else {
          setError('Product not found');
        }
      } catch (error) {
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productName]);

  const addToCartHandler = () => {
    try {
      dispatch(addItemToCart({
        id: product.name.toLowerCase().replace(/\s+/g, '-'),
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      }));
    } catch (error) {
      setError('Failed to add item to cart');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background-light text-text px-6 py-12">
      <div className="max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              objectFit="cover"
              width={500} 
              height={500} 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-text-muted mb-4">{product.description}</p>
            <p className="text-primary font-bold text-2xl mb-6">${product.price} per day</p>

            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside mb-8">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <ul className="list-inside mb-8">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="mb-2">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="bg-background-light p-4 rounded-lg shadow-md">
                  <p className="text-lg mb-2"><strong>{review.user}</strong> rated it {review.rating} stars</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>

            <button onClick={addToCartHandler} className="mt-8 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
