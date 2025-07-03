import React from 'react';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';


export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full luxury-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-playfair text-xl font-bold">Luxe</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover exceptional jewelry crafted with precision and passion. 
              Every piece tells a story of elegance and timeless beauty.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gold-400">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gold-400">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gold-400">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                All Products
              </Link>
              <Link href="/categories" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Categories
              </Link>
              <Link href="/new-arrivals" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                New Arrivals
              </Link>
              <Link href="/sale" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Sale
              </Link>
              <Link href="/gift-cards" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Gift Cards
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/contact" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Returns & Exchanges
              </Link>
              <Link href="/size-guide" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Size Guide
              </Link>
              <Link href="/track-order" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                Track Your Order
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>hello@luxejewelry.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                />
                <Button className="luxury-gradient text-white px-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-gold-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 Luxe Jewelry Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}