'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { Button } from '../..components/ui/button';
import { Input } from '../..components/ui/input';
import { Card, CardContent } from '../..components/ui/card';
import { Badge } from '../..components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../..components/ui/select';
import { Slider } from '../..components/ui/slider';
import { Checkbox } from '../..components/ui/checkbox';
import { useStore } from '../..lib/store';
import { mockProducts } from '../..lib/mock-data.js';
import Link from 'next/link';

export default function Necklaces() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart, addToWishlist, wishlist } = useStore();

  const necklaceProducts = mockProducts.filter(product => product.category === 'necklaces');
  const materials = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum', 'Diamond', 'Sapphire', 'Emerald', 'Pearls'];

  const filteredProducts = useMemo(() => {
    let filtered = necklaceProducts.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      if (selectedMaterials.length > 0) {
        const productMaterials = product.material.split(', ');
        if (!selectedMaterials.some(material => productMaterials.includes(material))) {
          return false;
        }
      }
      return true;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, priceRange, selectedMaterials, sortBy, necklaceProducts]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  const handleMaterialChange = (material, checked) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <nav className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-gold-600 transition-colors">Products</Link>
              <span>/</span>
              <span className="text-gray-900">Necklaces</span>
            </div>
          </nav>
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            Necklaces Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover our exquisite collection of {necklaceProducts.length} stunning necklaces, from elegant pendants to statement pieces.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search necklaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Materials</h3>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={material}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={(checked) => handleMaterialChange(material, checked)}
                        />
                        <label
                          htmlFor={material}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 5000]);
                    setSelectedMaterials([]);
                    setSortBy('featured');
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {necklaceProducts.length} necklaces
              </p>
            </div>

            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'
                    }`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
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

                      {product.originalPrice && (
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                          Sale
                        </Badge>
                      )}
                    </div>

                    <div className={`space-y-4 ${viewMode === 'list' ? 'flex-1 p-6' : 'p-6'}`}>
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

                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg text-gray-900 hover:text-gold-600 transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>

                      {viewMode === 'list' && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {product.description}
                        </p>
                      )}

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

                      {viewMode === 'list' && (
                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => handleAddToWishlist(product)}
                            className="flex-1"
                          >
                            <Heart className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            Wishlist
                          </Button>
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 luxury-gradient text-white"
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No necklaces found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 5000]);
                    setSelectedMaterials([]);
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}