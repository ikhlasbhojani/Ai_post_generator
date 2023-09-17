import React from 'react';

interface ProductCardProps {
  product: {
    image: string | null;
    title: string;
    description: string;
  };
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden hover:shadow-xl">
      <img src={product.image || ''} alt={product.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
