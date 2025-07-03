'use client';

import React, { useState } from 'react';
import { HelpCircle, Search, Book, MessageCircle, Mail, Phone, FileText, Video, Download, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { adminPaddingConfig } from '../../lib/admin-padding-data';

const faqData = [
  {
    id: 'faq-1',
    question: 'How do I add a new product to the inventory?',
    answer: 'To add a new product, go to the Products section in the admin panel, click "Add New Product", fill in all the required information including name, price, description, and images, then save the product.'
  },
  {
    id: 'faq-2',
    question: 'How can I update order status?',
    answer: 'Navigate to the Orders section, find the specific order, and use the status dropdown to change it from "Placed" to "Processing", "Shipped", or "Delivered". Customers will be automatically notified of status changes.'
  },
  {
    id: 'faq-3',
    question: 'How do I set up payment methods?',
    answer: 'Go to Settings > Payments, enable your preferred payment providers (Stripe, PayPal), and enter your API keys. Make sure to test the integration before going live.'
  },
  {
    id: 'faq-4',
    question: 'How can I manage customer reviews?',
    answer: 'In the Reviews section, you can view all customer reviews, approve or reject pending reviews, respond to reviews as the store owner, and moderate inappropriate content.'
  },
  {
    id: 'faq-5',
    question: 'How do I configure shipping rates?',
    answer: 'Visit Settings > Shipping to set up shipping zones, rates for different regions, free shipping thresholds, and processing times. You can create multiple shipping options for customers.'
  },
  {
    id: 'faq-6',
    question: 'How can I view sales analytics?',
    answer: 'The Analytics dashboard provides comprehensive sales data, including revenue trends, top-selling products, customer segments, and performance metrics. You can filter by date ranges and export reports.'
  }
];

const helpResources = [
  {
    title: 'Getting Started Guide',
    description: 'Complete setup guide for new store owners',
    type: 'guide',
    icon: Book,
    link: '#'
  },
  {
    title: 'Product Management',
    description: 'Learn how to add, edit, and organize products',
    type: 'tutorial',
    icon: Video,
    link: '#'
  },
  {
    title: 'Order Processing',
    description: 'Step-by-step order fulfillment process',
    type: 'guide',
    icon: FileText,
    link: '#'
  },
  {
    title: 'Payment Setup',
    description: 'Configure payment gateways and methods',
    type: 'tutorial',
    icon: Video,
    link: '#'
  },
  {
    title: 'Marketing Tools',
    description: 'Use built-in marketing features effectively',
    type: 'guide',
    icon: Book,
    link: '#'
  },
  {
    title: 'Analytics & Reports',
    description: 'Understanding your store performance data',
    type: 'tutorial',
    icon: Video,
    link: '#'
  }
];

const supportChannels = [
  {
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    icon: Mail,
    contact: 'support@luxejewelry.com',
    availability: '24/7'
  },
  {
    title: 'Phone Support',
    description: 'Speak directly with our support team',
    icon: Phone,
    contact: '+1 (555) 123-4567',
    availability: 'Mon-Fri 9AM-6PM EST'
  },
  {
    title: 'Live Chat',
    description: 'Instant help through live chat',
    icon: MessageCircle,
    contact: 'Available in dashboard',
    availability: 'Mon-Fri 9AM-6PM EST'
  }
];

export default function AdminHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Help & Support
          </h1>
          <p className="text-lg text-gray-600">
            Find answers, guides, and get support for your store
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className={adminPaddingConfig.cards.default}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* Help Tabs */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {filteredFAQs.length === 0 && searchQuery && (
                  <div className="text-center py-8">
                    <HelpCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try different keywords or browse our guides section.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className={adminPaddingConfig.cards.default}>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                              {resource.type}
                            </span>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <Card key={index}>
                    <CardContent className={adminPaddingConfig.cards.default}>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{channel.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                        <div className="space-y-2">
                          <p className="font-medium">{channel.contact}</p>
                          <p className="text-sm text-gray-500">{channel.availability}</p>
                        </div>
                        <Button className="mt-4 w-full" variant="outline">
                          Contact Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Support Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={4}
                    placeholder="Please provide detailed information about your issue..."
                  ></textarea>
                </div>
                <Button className="mt-4 luxury-gradient text-white">
                  Submit Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Admin Guide</p>
                          <p className="text-sm text-gray-600">Complete admin documentation</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">API Documentation</p>
                          <p className="text-sm text-gray-600">Developer API reference</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Online
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Video className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Video Tutorials</p>
                          <p className="text-sm text-gray-600">Step-by-step video guides</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Version:</span>
                      <span className="font-medium">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Update:</span>
                      <span className="font-medium">Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">System Status:</span>
                      <span className="font-medium text-green-600">All Systems Operational</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Status Page
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Release Notes
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Community Forum
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}