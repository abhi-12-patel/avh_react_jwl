import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { mockProducts } from '../../lib/mock-data';
import { Button } from '../ui/button';
import { useStore } from '../../lib/store';

export function FeaturedProducts() {
  const { addToCart, addToWishlist, wishlist } = useStore();

  const featuredProducts = mockProducts.filter(product => product.featured);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="text-gold-600 border-gold-600">
            Featured Collection
          </Badge>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Handpicked for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most coveted pieces, carefully selected for their exceptional 
            beauty and craftsmanship.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/90 hover:bg-white shadow-lg"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </Button>
                      <Button
                        size="icon"
                        className="rounded-full luxury-gradient text-white shadow-lg"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                      Sale
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-gold-400 text-gold-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Title */}
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg text-gray-900 hover:text-gold-600 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Material */}
                  <p className="text-sm text-gray-600">{product.material}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}