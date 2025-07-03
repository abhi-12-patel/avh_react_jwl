
import React from 'react';
import { Award, Users, Heart, Sparkles, Clock, Shield } from 'lucide-react';
import { CardContent,Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'Every piece is crafted with meticulous attention to detail and genuine love for the art of jewelry making.'
    },
    {
      icon: Award,
      title: 'Uncompromising Quality',
      description: 'We use only the finest materials and work with master craftsmen to ensure exceptional quality in every piece.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide personalized service and lifetime support for all our jewelry.'
    },
    {
      icon: Shield,
      title: 'Trust & Authenticity',
      description: 'All our jewelry comes with certificates of authenticity and comprehensive warranties for your peace of mind.'
    }
  ];

  const milestones = [
    { year: '1999', event: 'Founded Luxe Jewelry with a vision to create timeless pieces' },
    { year: '2005', event: 'Opened our first flagship store in New York City' },
    { year: '2010', event: 'Launched our online platform, reaching customers worldwide' },
    { year: '2015', event: 'Introduced sustainable and ethically sourced jewelry collection' },
    { year: '2020', event: 'Expanded to 25+ locations across North America' },
    { year: '2024', event: 'Celebrating 25 years of exceptional jewelry craftsmanship' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gold-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="text-gold-600 border-gold-600 mb-6">
              Our Story
            </Badge>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Crafting Dreams into
              <span className="text-gold-600 block">Timeless Beauty</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              For over 25 years, Luxe Jewelry has been at the forefront of fine jewelry design, 
              creating exceptional pieces that celebrate life's most precious moments. Our commitment 
              to excellence, craftsmanship, and customer satisfaction has made us a trusted name 
              in luxury jewelry.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1999 by master jeweler Maria Rodriguez, Luxe Jewelry began as a small 
                  atelier in the heart of New York's Diamond District. With a passion for creating 
                  unique, handcrafted pieces, Maria's vision was to make luxury jewelry accessible 
                  to everyone who appreciates fine craftsmanship.
                </p>
                <p>
                  Today, we continue to honor that vision by combining traditional techniques with 
                  modern innovation. Each piece in our collection tells a story, whether it's a 
                  symbol of love, achievement, or personal style. Our team of skilled artisans 
                  works tirelessly to ensure that every diamond is perfectly set, every gold band 
                  is flawlessly polished, and every customer receives a piece they'll treasure forever.
                </p>
                <p>
                  We believe that jewelry is more than just an accessory – it's a reflection of 
                  your personality, a celebration of your milestones, and a legacy to pass down 
                  through generations.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1927248/pexels-photo-1927248.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Jewelry craftsmanship"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-8 w-8 text-gold-500" />
                  <div>
                    <p className="font-bold text-2xl text-gray-900">25+</p>
                    <p className="text-sm text-gray-600">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from design to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full">
                      <Icon className="h-8 w-8 text-gold-600" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped our story over the years.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-200"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="absolute left-6 w-4 h-4 bg-gold-500 rounded-full border-4 border-white shadow-lg"></div>
                    <div className="ml-16 bg-white p-6 rounded-lg shadow-md">
                      <div className="flex items-center space-x-4">
                        <Badge variant="default" className="bg-gold-100 text-gold-800 font-bold">
                          {milestone.year}
                        </Badge>
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">25+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">50K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">500+</div>
              <div className="text-gray-300">Unique Designs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">25</div>
              <div className="text-gray-300">Store Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind every beautiful piece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Maria Rodriguez"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Maria Rodriguez</h3>
                <p className="text-gold-600 text-sm mb-3">Founder & Master Jeweler</p>
                <p className="text-gray-600 text-sm">
                  With over 30 years of experience, Maria's vision and expertise continue to guide our creative direction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="David Chen"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-900 mb-1">David Chen</h3>
                <p className="text-gold-600 text-sm mb-3">Head of Design</p>
                <p className="text-gray-600 text-sm">
                  David brings innovative design concepts while respecting traditional craftsmanship techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Sarah Johnson"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Sarah Johnson</h3>
                <p className="text-gold-600 text-sm mb-3">Customer Experience Director</p>
                <p className="text-gray-600 text-sm">
                  Sarah ensures every customer receives personalized service and finds their perfect piece.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}