"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/features/cartSlice";
import Skeleton from 'react-loading-skeleton';

const SinglePage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const productId = pathname.split('/').pop(); // Извлекаем id продукта из URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`); // Запрос продукта по id
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
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
  }, [productId]);

  const addToCartHandler = () => {
    try {
      dispatch(addItemToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      }));
      alert('Product added to cart successfully!');
    } catch (error) {
      setError('Failed to add item to cart');
    }
  };

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light text-gray-600 px-3 py-12">
        <div className="max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Skeleton height={500} />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <Skeleton height={40} width={300} />
              <Skeleton count={5} style={{ marginTop: '1rem' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
        <button onClick={goBack} className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">Go Back</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Product not found</p>
        <button onClick={goBack} className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light text-text px-3 py-12">
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

            <div className="mt-8 flex space-x-4">
              <button onClick={addToCartHandler} className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light">
                Add to Cart
              </button>
              <button onClick={goBack} className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-light">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
