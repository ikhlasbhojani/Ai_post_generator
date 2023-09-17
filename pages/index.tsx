import ProductForm from '@/components/productForm';
import ProductCard from '@/components/productCard';
import React, { useState } from 'react';


interface Product {
  image: string | null;
  title: string;
  description : string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductSubmit = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return (
    <main>
      <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-md p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">AI Connect to E-Commerce and Blog Website</h1>
          <ProductForm onSubmit={handleProductSubmit} />

          {/* Render product cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </main>
  );
}

