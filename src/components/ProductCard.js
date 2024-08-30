import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/features/cartSlice';

const ProductCard = ({ product }) => {
  const productUrl = `/products/${product._id}`;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    }));
    alert('Product added to cart successfully!');
  };

  return (
    <div className="bg-background p-5 pt-0 flex flex-col justify-between rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
      <Link href={productUrl} passHref>
        <div className="relative h-60 w-full mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            priority
          />
        </div>
      </Link>
      <div className="flex flex-col items-start justify-between">
        <h3 className="text-xl font-semibold text-nowrap">{product.name}</h3>
        <p className="text-text-muted mt-2">{product.description}</p>
        <div className="flex w-full justify-between items-center">
          <p className="text-primary font-bold text-lg mt-4">${product.price} per day</p>
          <button
            onClick={addToCartHandler}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
