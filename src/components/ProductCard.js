import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  const productUrl = `/products/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`;

  return (
    <Link href={productUrl} passHref>
      <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
        <div className="relative h-56 w-full mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            priority
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-center">{product.name}</h3>
          <p className="text-text-muted mt-2 text-center">{product.description}</p>
          <p className="text-primary font-bold text-lg mt-4">${product.price} per day</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
