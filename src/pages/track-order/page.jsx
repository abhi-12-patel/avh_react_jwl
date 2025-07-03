
import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { useStore } from '../../lib/store';

const statusIcons = {
  placed: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors = {
  placed: 'text-blue-500',
  processing: 'text-yellow-500',
  shipped: 'text-purple-500',
  delivered: 'text-green-500',
};

const statusBadgeColors = {
  placed: 'bg-blue-100 text-blue-800',
  processing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const { orders } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock order search - in real app, this would call an API
    const mockOrder = {
      id: orderId || 'ORD-2024-001',
      status: 'shipped',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-17T14:30:00Z',
      items: [
        {
          id: '1',
          name: 'Eternal Rose Gold Ring',
          price: 1299,
          quantity: 1,
          images: ['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=300']
        }
      ],
      total: 1349,
      shippingAddress: {
        name: 'Sarah Johnson',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      tracking: {
        carrier: 'FedEx',
        trackingNumber: 'FX123456789',
        estimatedDelivery: '2024-01-20'
      }
    };

    setSearchResult(mockOrder);
  };

  const getStatusSteps = (currentStatus) => {
    const steps = [
      { status: 'placed', label: 'Order Placed', date: '2024-01-15' },
      { status: 'processing', label: 'Processing', date: '2024-01-16' },
      { status: 'shipped', label: 'Shipped', date: '2024-01-17' },
      { status: 'delivered', label: 'Delivered', date: null },
    ];

    const currentIndex = steps.findIndex(step => step.status === currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your order ID and email address to track your jewelry order status.
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-center">Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <Input
                  id="orderId"
                  type="text"
                  placeholder="e.g., ORD-2024-001"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full luxury-gradient text-white py-3"
              >
                <Search className="mr-2 h-5 w-5" />
                Track Order
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Results */}
        {searchResult && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold text-2xl text-gray-900 mb-2">
                      Order #{searchResult.id}
                    </h2>
                    <p className="text-gray-600">
                      Placed on {new Date(searchResult.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={statusBadgeColors[searchResult.status]}>
                    {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1)}
                  </Badge>
                </div>

                {/* Order Progress */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-4">Order Progress</h3>
                  <div className="flex items-center justify-between">
                    {getStatusSteps(searchResult.status).map((step, index) => {
                      const Icon = statusIcons[step.status];
                      return (
                        <div key={step.status} className="flex flex-col items-center flex-1">
                          <div className={`
                            relative w-12 h-12 rounded-full flex items-center justify-center mb-2
                            ${step.completed 
                              ? 'bg-gold-100 text-gold-600 border-2 border-gold-600' 
                              : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                            }
                            ${step.active ? 'ring-4 ring-gold-200' : ''}
                          `}>
                            <Icon className="h-6 w-6" />
                            {index < getStatusSteps(searchResult.status).length - 1 && (
                              <div className={`
                                absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2
                                ${step.completed ? 'bg-gold-600' : 'bg-gray-300'}
                              `} />
                            )}
                          </div>
                          <div className="text-center">
                            <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.label}
                            </p>
                            {step.date && (
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(step.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tracking Info */}
                {searchResult.tracking && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Tracking Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Carrier:</span>
                        <p className="font-medium">{searchResult.tracking.carrier}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Tracking Number:</span>
                        <p className="font-medium">{searchResult.tracking.trackingNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Est. Delivery:</span>
                        <p className="font-medium">
                          {new Date(searchResult.tracking.estimatedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResult.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl">${searchResult.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700">
                  <p className="font-medium">{searchResult.shippingAddress.name}</p>
                  <p>{searchResult.shippingAddress.address}</p>
                  <p>
                    {searchResult.shippingAddress.city}, {searchResult.shippingAddress.state} {searchResult.shippingAddress.zipCode}
                  </p>
                  <p>{searchResult.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}