import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Sparkles className="h-4 w-4 text-gold-500" />
            <span className="text-sm font-medium text-gray-800">New Collection Available</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Timeless
              <span className="text-gold-600 block">Elegance</span>
              <span className="text-gray-700">Redefined</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of exquisite jewelry, where each piece 
              is crafted with passion and precision to celebrate life's most precious moments.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/products">
              <Button 
                size="lg" 
                className="luxury-gradient text-white px-8 py-4 text-lg font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 text-lg font-medium rounded-full hover:border-gold-500 hover:text-gold-600 transition-all duration-300"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Unique Pieces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">25+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-700" />
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-rosegold-400 rounded-full animate-pulse delay-1000" />
    </section>
  );
}