import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { categories } from '../../lib/mock-data';

export function CategoriesSection() {


  return (
  <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed to complement every style and occasion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-playfair text-2xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-200 mb-4">
                        {category.count} items
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:text-gold-400 hover:bg-transparent p-0 h-auto font-medium group-hover:translate-x-1 transition-transform duration-200"
                      >
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>

  );
}