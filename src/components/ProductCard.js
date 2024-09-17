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
      availableQuantity: product.availableQuantity,
    }));
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

        <p className={`mt-2 text-nowrap ${product.availableQuantity === 0 ? 'text-red-500' : 'text-green-500'}`}>
          {product.availableQuantity > 0 
            ? `Available: ${product.availableQuantity}` 
            : 'Out of Stock'}
        </p>

        <div className="flex w-full justify-between items-center mt-4">
          <p className="text-primary font-bold text-lg">${product.price} per day</p>

          <button
            onClick={addToCartHandler}
            className={`px-4 py-2 bg-primary text-white rounded-md  transition-transform duration-300 ease-in-out transform  shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light ${
              product.availableQuantity === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-primary-dark'
            }`}
            disabled={product.quantity === product.availableQuantity}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
