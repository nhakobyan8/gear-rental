"use client";
import React, { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/features/cartSlice";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const SinglePage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const productId = pathname.split('/').pop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        toast.error(error.message || 'Error fetching product', {
          position: "top-center",
          theme: "dark"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCartHandler = useCallback(() => {
    try {
      dispatch(addItemToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        availableQuantity: product.availableQuantity,
      }));
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  }, [dispatch, product]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-text-muted" />
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
    <div className="min-h-screen bg-background-light text-text px-4 py-12">
      <div className="max-w-6xl mx-auto bg-background p-10 rounded-lg shadow-2xl">
        <div className="flex flex-col items-center md:flex-row mb-10">
          <div className="md:w-1/2 mb-8 md:mb-0 cursor-pointer group owerflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              objectFit="cover"
              width={600}
              height={600}
              className="w-full h-auto rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              aria-label={product.name}
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-text-muted mb-4">{product.description}</p>
            <p className="text-primary font-bold text-3xl mb-6">${product.price} per day</p>
  
            {product.availableQuantity !== 0 ? (
              <h2 className="text-xl font-semibold mb-4">In Stock: {product.availableQuantity}</h2>
            ) : (
              <p className="text-red-500 text-lg mb-6">Currently out of stock for rental.</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-3">
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
  
            <h2 className="text-2xl font-semibold mt-8 mb-4">Specifications</h2>
            <ul className="space-y-2">
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="mb-2">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews?.map((review, index) => (
                <div key={index} className="bg-background-light p-4 rounded-lg shadow-md">
                  <p className="text-lg mb-2">
                    <strong>{review.user}</strong> rated it {review.rating} stars
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Секция с кнопками действий */}
        <div className="mt-10 flex justify-start space-x-4">
          <button
            onClick={addToCartHandler}
            className={`px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light ${
              product.availableQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={product.availableQuantity === 0}
          >
            Add to Cart
          </button>
          <button
            onClick={goBack}
            className="px-6 py-3 border border-slate-400 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-light"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default SinglePage;
