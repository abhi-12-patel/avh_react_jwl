'use client';

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Award, Plus, Minus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { useStore } from '../../lib/store';
import { mockProducts } from '../../lib/mock-data';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist, wishlist } = useStore();
  const navigate = useNavigate();

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button className="luxury-gradient text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gold-600 transition-colors">Products</Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4 animate-slide-in">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-gold-500 ring-2 ring-gold-200' 
                        : 'border-gray-200 hover:border-gold-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-gold-600 border-gold-600 capitalize">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge className="bg-gold-100 text-gold-800">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold-400 text-gold-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-green-600 font-medium">
                  Save ${(product.originalPrice - product.price).toLocaleString()} 
                  ({Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Material */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Materials</h3>
              <p className="text-gray-600">{product.material}</p>
            </div>

            <Separator />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 luxury-gradient text-white py-3 text-lg font-medium hover:scale-105 transition-transform duration-200"
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="px-6 hover:scale-105 transition-transform duration-200"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Truck className="h-5 w-5 text-gold-600" />
                <div>
                  <div className="text-sm font-medium">Free Shipping</div>
                  <div className="text-xs text-gray-500">On orders over $1000</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Shield className="h-5 w-5 text-gold-600" />
                <div>
                  <div className="text-sm font-medium">Warranty</div>
                  <div className="text-xs text-gray-500">1 year guarantee</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <RotateCcw className="h-5 w-5 text-gold-600" />
                <div>
                  <div className="text-sm font-medium">Returns</div>
                  <div className="text-xs text-gray-500">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16 animate-fade-in">
          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This exquisite piece is crafted with the finest materials and attention to detail. 
                    Each item is carefully inspected to ensure it meets our high standards of quality and beauty.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Materials</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• {product.material}</li>
                      <li>• Hypoallergenic materials</li>
                      <li>• Conflict-free sourcing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Dimensions</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Weight: Varies by size</li>
                      <li>• Available in multiple sizes</li>
                      <li>• Custom sizing available</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="care" className="mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Care Instructions</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Clean with a soft, lint-free cloth</li>
                    <li>• Store in a jewelry box or soft pouch</li>
                    <li>• Avoid exposure to chemicals and perfumes</li>
                    <li>• Remove before swimming or exercising</li>
                    <li>• Professional cleaning recommended annually</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Customer Reviews</h4>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/products/${product.id}/reviews`)}>
                      Write a Review
                    </Button>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah M.', rating: 5, comment: 'Absolutely beautiful! The quality is exceptional and it arrived quickly.', date: '2024-01-15' },
                      { name: 'Michael R.', rating: 5, comment: 'Perfect for my wife\'s birthday. She loves it!', date: '2024-01-10' },
                      { name: 'Emma L.', rating: 4, comment: 'Gorgeous piece, though slightly smaller than expected.', date: '2024-01-08' }
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'fill-gold-400 text-gold-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                  <Card 
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900">
                            ${relatedProduct.price.toLocaleString()}
                          </span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${relatedProduct.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}