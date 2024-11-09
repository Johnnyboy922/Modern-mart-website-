import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';
import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    images: ['https://example.com/headphones.jpg'],
    category: 'Electronics',
    seller: {
      id: '1',
      name: 'Tech Store',
      email: 'store@example.com',
      role: 'seller'
    },
    rating: 4.5,
    reviews: [],
    stock: 50,
    createdAt: new Date().toISOString()
  },
  // Add more mock products as needed
];

export default function Marketplace() {
  const { activeFilters, searchQuery } = useStore();
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('rating');

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilters.category.length === 0 || 
        activeFilters.category.includes(product.category);
      const matchesPrice = 
        product.price >= activeFilters.priceRange[0] &&
        product.price <= activeFilters.priceRange[1];
      const matchesRating = product.rating >= activeFilters.rating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return b.rating - a.rating;
    });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
          className="px-4 py-2 border rounded-md"
        >
          <option value="rating">Sort by Rating</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}