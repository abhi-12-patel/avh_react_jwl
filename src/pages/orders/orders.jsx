'use client';

import React, { useState } from 'react';
import { Package, Eye, Download, Truck, Clock, CheckCircle, Search, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Separator } from '../../components/ui/separator';
import { useStore } from '../../lib/store';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { user, orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders if none exist
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      userId: user?.id || '1',
      status: 'delivered',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      total: 1349,
      items: [
        {
          id: '1',
          name: 'Eternal Rose Gold Ring',
          price: 1299,
          quantity: 1,
          images: ['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=300'],
          category: 'rings',
          description: 'A stunning rose gold ring',
          material: 'Rose Gold, Diamond',
          inStock: true,
          rating: 4.8,
          reviews: 124
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      }
    },
    {
      id: 'ORD-2024-002',
      userId: user?.id || '1',
      status: 'shipped',
      createdAt: '2024-01-15T15:30:00Z',
      updatedAt: '2024-01-17T09:15:00Z',
      total: 2549,
      items: [
        {
          id: '2',
          name: 'Sapphire Elegance Necklace',
          price: 2499,
          quantity: 1,
          images: ['https://images.pexels.com/photos/1927247/pexels-photo-1927247.jpeg?auto=compress&cs=tinysrgb&w=300'],
          category: 'necklaces',
          description: 'An exquisite sapphire necklace',
          material: 'White Gold, Sapphire',
          inStock: true,
          rating: 4.9,
          reviews: 87
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      }
    }
  ];

  const allOrders = orders.length > 0 ? orders : mockOrders;

  const statusColors = {
    placed: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    placed: Clock,
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
  };

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'amount-high':
        return b.total - a.total;
      case 'amount-low':
        return a.total - b.total;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleDownloadInvoice = (order) => {
    // Mock invoice download
    const invoiceData = `
LUXE JEWELRY STORE
Invoice

Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Customer: ${order.shippingAddress.name}

Items:
${order.items.map((item) => `- ${item.name} x${item.quantity} - $${item.price}`).join('\n')}

Total: $${order.total.toLocaleString()}

Thank you for your business!
    `;

    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <Package className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your orders.</p>
          <Link to="/login">
            <Button className="luxury-gradient text-white hover:scale-105 transition-transform duration-200">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-lg text-gray-600">
            Track and manage your jewelry orders
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search orders by ID or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 transition-all duration-200 focus:scale-105"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 transition-all duration-200 hover:scale-105">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="placed">Placed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 transition-all duration-200 hover:scale-105">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                    <SelectItem value="amount-low">Amount: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {sortedOrders.length === 0 ? (
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <Package className="h-24 w-24 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery || statusFilter !== 'all' ? 'No matching orders found' : 'No orders yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start shopping to see your orders here'
                }
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Link to="/products">
                  <Button className="luxury-gradient text-white hover:scale-105 transition-transform duration-200">
                    Start Shopping
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order, index) => {
              const StatusIcon = statusIcons[order.status];
              return (
                <Card
                  key={order.id}
                  className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <StatusIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={statusColors[order.status]}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="font-bold text-lg text-gray-900">
                          ${order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} • ${item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Link to={`/track-order?orderId=${order.id}`}>
                        <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                          <Truck className="h-4 w-4 mr-2" />
                          Track Order
                        </Button>
                      </Link>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="hover:scale-105 transition-transform duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Order Details - #{order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              {/* Order Status */}
                              <div className="flex items-center justify-between">
                                <Badge className={statusColors[selectedOrder.status]}>
                                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                </Badge>
                                <span className="text-sm text-gray-600">
                                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                                </span>
                              </div>

                              {/* Items */}
                              <div>
                                <h3 className="font-semibold mb-3">Order Items</h3>
                                <div className="space-y-3">
                                  {selectedOrder.items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                      <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                      />
                                      <div className="flex-1">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-gray-600">{item.material}</p>
                                        <p className="text-sm">Qty: {item.quantity}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <Separator />

                              {/* Shipping Address */}
                              <div>
                                <h3 className="font-semibold mb-3">Shipping Address</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                                  <p>{selectedOrder.shippingAddress.address}</p>
                                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                                  <p>{selectedOrder.shippingAddress.country}</p>
                                </div>
                              </div>

                              <Separator />

                              {/* Total */}
                              <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total</span>
                                <span>${selectedOrder.total.toLocaleString()}</span>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadInvoice(order)}
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </Button>

                      {order.status === 'delivered' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          Write Review
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Order Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Total Orders', value: allOrders.length, icon: Package },
            { label: 'Total Spent', value: `$${allOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`, icon: FileText },
            { label: 'Delivered', value: allOrders.filter(order => order.status === 'delivered').length, icon: CheckCircle },
            { label: 'In Transit', value: allOrders.filter(order => order.status === 'shipped').length, icon: Truck }
          ].map((stat, index) => (
            <Card
              key={stat.label}
              className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 text-center">
                <stat.icon className="h-8 w-8 mx-auto text-gold-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}