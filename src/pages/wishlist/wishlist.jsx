import React from 'react';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom'; // React Router
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useStore } from '../../lib/store';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="text-gray-400">
            <Heart className="h-24 w-24 mx-auto" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-gray-900">
            Your wishlist is empty
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Save your favorite jewelry pieces to your wishlist and never lose track of them.
          </p>
          <Link to="/products">
            <Button size="lg" className="luxury-gradient text-white px-8 py-3 hover:scale-105 transition-transform duration-200">
              Discover Jewelry
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-lg text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        size="icon"
                        className="rounded-full luxury-gradient text-white shadow-lg hover:scale-110 transition-transform duration-200"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/90 hover:bg-white shadow-lg text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>

                <div className="p-6 space-y-4">
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

                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg text-gray-900 hover:text-gold-600 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

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

                  <p className="text-sm text-gray-600">{product.material}</p>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 luxury-gradient text-white hover:scale-105 transition-transform duration-200"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:scale-105 transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link to="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
