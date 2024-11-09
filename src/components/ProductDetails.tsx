import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  // In a real app, fetch product details using the id
  const product = {
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
  };

  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            className="rounded-lg overflow-hidden"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.title} - ${index + 1}`}
                  className="w-full h-[400px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md px-2 py-1"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-lg border ${
                  isInWishlist
                    ? 'bg-red-50 border-red-200'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">{product.seller.name}</p>
                <p className="text-sm text-gray-600">Member since 2023</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}