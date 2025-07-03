
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Package, Heart, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { useStore } from '../../lib/store';
import { Link } from 'react-router-dom';

export default function Account() {
  const { user, setUser, orders, wishlist } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    birthDate: '1990-01-01'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '123 Main Street',
      city: user?.city || 'New York',
      state: user?.state || 'NY',
      zipCode: user?.zipCode || '10001',
      country: user?.country || 'United States',
      birthDate: user?.birthDate || '1990-01-01'
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <User className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your account.</p>
          <Link to="/login">
            <Button className="luxury-gradient text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    placed: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            My Account
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 animate-slide-in">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={user.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <button className="absolute bottom-0 right-0 bg-gold-500 text-white rounded-full p-2 hover:bg-gold-600 transition-all duration-300 transform hover:scale-110">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="font-semibold text-xl text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <Badge className="bg-gold-100 text-gold-800 animate-pulse">Premium Member</Badge>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total orders</span>
                    <span className="font-medium">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Wishlist items</span>
                    <span className="font-medium">{wishlist.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Loyalty points</span>
                    <span className="font-medium">2,450</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-2">
                  <Link to="/orders" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      My Orders
                    </Button>
                  </Link>
                  <Link to="/wishlist" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 animate-fade-in">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSave}
                          className="luxury-gradient text-white hover:scale-105 transition-transform duration-200"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        {isEditing ? (
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="transition-all duration-200 focus:scale-105"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{formData.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        {isEditing ? (
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="transition-all duration-200 focus:scale-105"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{formData.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="transition-all duration-200 focus:scale-105"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{formData.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Birth Date
                        </label>
                        {isEditing ? (
                          <Input
                            name="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="transition-all duration-200 focus:scale-105"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(formData.birthDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Recent Orders */}
              <TabsContent value="orders">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Link to="/orders">
                      <Button variant="outline" size="sm">
                        View All Orders
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8 animate-fade-in">
                        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">No orders yet</p>
                        <Link to="/products">
                          <Button className="luxury-gradient text-white">
                            Start Shopping
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order, index) => (
                          <div 
                            key={order.id} 
                            className="border rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="font-semibold">Order #{order.id}</h3>
                                <p className="text-sm text-gray-600">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge className={statusColors[order.status]}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                              </span>
                              <span className="font-semibold">${order.total.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses */}
              <TabsContent value="addresses">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Saved Addresses</CardTitle>
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                      Add New Address
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">Home</h3>
                            <Badge variant="secondary" className="text-xs">Default</Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{formData.address}</span>
                          </div>
                          <p className="ml-6">
                            {formData.city}, {formData.state} {formData.zipCode}
                          </p>
                          <p className="ml-6">{formData.country}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Account Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <span className="text-sm">Email notifications</span>
                          <input type="checkbox" defaultChecked className="rounded transition-transform duration-200 hover:scale-110" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <span className="text-sm">Order updates</span>
                          <input type="checkbox" defaultChecked className="rounded transition-transform duration-200 hover:scale-110" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <span className="text-sm">Marketing emails</span>
                          <input type="checkbox" className="rounded transition-transform duration-200 hover:scale-110" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Privacy</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <span className="text-sm">Profile visibility</span>
                          <select className="text-sm border rounded px-2 py-1 transition-all duration-200 hover:scale-105">
                            <option>Private</option>
                            <option>Public</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <span className="text-sm">Data sharing</span>
                          <input type="checkbox" className="rounded transition-transform duration-200 hover:scale-110" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3 text-red-600">Danger Zone</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 hover:scale-105 transition-all duration-200">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}