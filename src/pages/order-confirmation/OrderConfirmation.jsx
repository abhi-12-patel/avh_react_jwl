
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Clock, Download, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { useStore } from '../../lib/store';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function OrderConfirmation() {
  const query = useQuery();
  const navigate = useNavigate();
  const orderId = query.get('orderId');
  const [orderDetails, setOrderDetails] = useState(null);
  const { orders, cart, clearCart } = useStore();

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Find order in store or create mock order details
    const existingOrder = orders.find(order => order.id === orderId);

    if (existingOrder) {
      setOrderDetails(existingOrder);
    } else {
      // Create mock order details for demonstration
      const mockOrder = {
        id: orderId,
        status: 'placed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: cart.length > 0 ? cart : [
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
        total: 1349,
        shippingAddress: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        },
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      setOrderDetails(mockOrder);
    }

    // Clear cart after successful order
    if (cart.length > 0) {
      clearCart();
    }
    // eslint-disable-next-line
  }, [orderId, orders, cart, clearCart, navigate]);

  const handleDownloadInvoice = () => {
    if (!orderDetails) return;
    const invoiceData = `
Order Invoice
Order ID: ${orderDetails.id}
Date: ${new Date(orderDetails.createdAt).toLocaleDateString()}
Total: $${orderDetails.total.toLocaleString()}
    `;

    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${orderDetails.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-green-800">Order ID:</span>
            <span className="text-sm font-bold text-green-900">{orderDetails.id}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Order Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-100 text-blue-800">
                  Order Placed
                </Badge>
                <span className="text-sm text-gray-600">
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="h-4 w-4" />
                  </div>
                  <p className="font-medium">Order Placed</p>
                  <p className="text-gray-500">Processing your order</p>
                </div>
                <div className="text-center opacity-50">
                  <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Package className="h-4 w-4" />
                  </div>
                  <p className="font-medium">Processing</p>
                  <p className="text-gray-500">Preparing for shipment</p>
                </div>
                <div className="text-center opacity-50">
                  <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck className="h-4 w-4" />
                  </div>
                  <p className="font-medium">Shipped</p>
                  <p className="text-gray-500">On the way to you</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Estimated Delivery:</strong> {new Date(orderDetails.estimatedDelivery).toLocaleDateString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  You'll receive tracking information via email once your order ships.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
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
                      <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${(orderDetails.total - 50 - orderDetails.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$50.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(orderDetails.total * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${orderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                </p>
                <p>{orderDetails.shippingAddress.country}</p>
                <p className="mt-2 text-sm text-gray-600">
                  Email: {orderDetails.shippingAddress.email}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {orderDetails.shippingAddress.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownloadInvoice}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Invoice</span>
            </Button>

            <Link to="/track-order" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                Track Your Order
              </Button>
            </Link>

            <Link to="/products" className="w-full sm:w-auto">
              <Button className="luxury-gradient text-white w-full sm:w-auto">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">Contact Support</Button>
                </Link>
                <Link to="/track-order" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">Track Order</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}