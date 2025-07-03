'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  UserCheck,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { mockProducts } from '../lib/mock-data';
import { useStore } from '../lib/store';

const salesData = [
  { month: 'Jan', sales: 45000, orders: 120, returns: 8 },
  { month: 'Feb', sales: 52000, orders: 145, returns: 12 },
  { month: 'Mar', sales: 48000, orders: 132, returns: 6 },
  { month: 'Apr', sales: 61000, orders: 168, returns: 15 },
  { month: 'May', sales: 67000, orders: 185, returns: 9 },
  { month: 'Jun', sales: 71000, orders: 201, returns: 11 },
];

const recentOrders = [
  { 
    id: 'ORD-001', 
    customer: 'Sarah Johnson', 
    customerEmail: 'sarah@example.com',
    amount: 1299, 
    status: 'shipped', 
    date: '2024-01-17',
    items: [{ name: 'Eternal Rose Gold Ring', quantity: 1, price: 1299 }]
  },
  { 
    id: 'ORD-002', 
    customer: 'Michael Chen', 
    customerEmail: 'michael@example.com',
    amount: 2499, 
    status: 'processing', 
    date: '2024-01-17',
    items: [{ name: 'Sapphire Elegance Necklace', quantity: 1, price: 2499 }]
  },
  { 
    id: 'ORD-003', 
    customer: 'Emma Davis', 
    customerEmail: 'emma@example.com',
    amount: 899, 
    status: 'delivered', 
    date: '2024-01-16',
    items: [{ name: 'Diamond Drop Earrings', quantity: 1, price: 899 }]
  },
  { 
    id: 'ORD-004', 
    customer: 'James Wilson', 
    customerEmail: 'james@example.com',
    amount: 599, 
    status: 'placed', 
    date: '2024-01-16',
    items: [{ name: 'Vintage Pearl Bracelet', quantity: 1, price: 599 }]
  },
  { 
    id: 'ORD-005', 
    customer: 'Lisa Brown', 
    customerEmail: 'lisa@example.com',
    amount: 1899, 
    status: 'returned', 
    date: '2024-01-15',
    items: [{ name: 'Emerald Statement Ring', quantity: 1, price: 1899 }]
  },
];

const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-06-15',
    totalOrders: 8,
    totalSpent: 12450,
    status: 'active',
    lastLogin: '2024-01-17'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 (555) 234-5678',
    joinDate: '2023-08-22',
    totalOrders: 5,
    totalSpent: 8900,
    status: 'active',
    lastLogin: '2024-01-16'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2023-12-10',
    totalOrders: 12,
    totalSpent: 18750,
    status: 'premium',
    lastLogin: '2024-01-17'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james@example.com',
    phone: '+1 (555) 456-7890',
    joinDate: '2024-01-05',
    totalOrders: 2,
    totalSpent: 1200,
    status: 'new',
    lastLogin: '2024-01-15'
  }
];

const statusColors = {
  placed: 'bg-blue-100 text-blue-800',
  processing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  returned: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

const userStatusColors = {
  active: 'bg-green-100 text-green-800',
  premium: 'bg-gold-100 text-gold-800',
  new: 'bg-blue-100 text-blue-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(recentOrders);
  const [users, setUsers] = useState(mockUsers);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    material: '',
    images: ['']
  });

  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalReturns = salesData.reduce((sum, item) => sum + item.returns, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const returnRate = (totalReturns / totalOrders * 100).toFixed(1);

  const orderStatusData = [
    { name: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#10B981' },
    { name: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: '#8B5CF6' },
    { name: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: '#F59E0B' },
    { name: 'Placed', value: orders.filter(o => o.status === 'placed').length, color: '#3B82F6' },
    { name: 'Returned', value: orders.filter(o => o.status === 'returned').length, color: '#EF4444' },
  ];

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      description: product.description,
      material: product.material,
      images: product.images
    });
  };

  const handleSaveProduct = () => {
    const updatedProduct = {
      ...editingProduct,
      name: productForm.name,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      category: productForm.category,
      description: productForm.description,
      material: productForm.material,
      images: productForm.images
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    resetForm();
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: (products.length + 1).toString(),
      name: productForm.name,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      category: productForm.category,
      description: productForm.description,
      material: productForm.material,
      images: productForm.images,
      inStock: true,
      featured: false,
      rating: 4.5,
      reviews: 0
    };

    setProducts([...products, newProduct]);
    setIsAddingProduct(false);
    resetForm();
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      material: '',
      images: ['']
    });
  };

  const handleFormChange = (field, value) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your jewelry store and track performance
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+12.5%', icon: DollarSign, positive: true },
                { title: 'Total Orders', value: totalOrders, change: '+8.2%', icon: ShoppingBag, positive: true },
                { title: 'Avg Order Value', value: `$${Math.round(avgOrderValue)}`, change: '-2.1%', icon: Package, positive: false },
                { title: 'Active Customers', value: users.filter(u => u.status === 'active').length, change: '+18.7%', icon: Users, positive: true },
                { title: 'Return Rate', value: `${returnRate}%`, change: '-1.2%', icon: RotateCcw, positive: true }
              ].map((kpi, index) => (
                <Card 
                  key={kpi.title} 
                  className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={`inline-flex items-center ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {kpi.change}
                      </span>
                      {' '}from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Monthly Sales & Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'sales' ? `$${value.toLocaleString()}` : value,
                        name === 'sales' ? 'Sales' : name === 'orders' ? 'Orders' : 'Returns'
                      ]} />
                      <Bar dataKey="sales" fill="#D4AF37" />
                      <Bar dataKey="returns" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.slice(0, 5).map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>${order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[order.status]}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="hover:scale-110 transition-transform duration-200"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="placed">Placed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{order.items.length} item(s)</TableCell>
                        <TableCell>${order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Select 
                            value={order.status} 
                            onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="placed">Placed</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="returned">Returned</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="hover:scale-110 transition-transform duration-200"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Order Details - #{order.id}</DialogTitle>
                                </DialogHeader>
                                {selectedOrder && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold">Customer Information</h4>
                                        <p>{selectedOrder.customer}</p>
                                        <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold">Order Status</h4>
                                        <Badge className={statusColors[selectedOrder.status]}>
                                          {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Items</h4>
                                      {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                          <span>{item.name}</span>
                                          <span>Qty: {item.quantity} - ${item.price}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex justify-between items-center font-bold text-lg">
                                      <span>Total:</span>
                                      <span>${selectedOrder.amount.toLocaleString()}</span>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Button 
                className="luxury-gradient text-white hover:scale-105 transition-transform duration-200"
                onClick={() => setIsAddingProduct(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <TableCell>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded transition-transform duration-200 hover:scale-110"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="capitalize">{product.category}</TableCell>
                        <TableCell>${product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={product.inStock ? 'default' : 'destructive'}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.featured ? 'default' : 'secondary'}>
                            {product.featured ? 'Featured' : 'Regular'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEditProduct(product)}
                              className="hover:scale-110 transition-transform duration-200"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-600 hover:text-red-700 hover:scale-110 transition-all duration-200"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Product Dialog */}
            <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Name</label>
                      <Input
                        value={productForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select value={productForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rings">Rings</SelectItem>
                          <SelectItem value="necklaces">Necklaces</SelectItem>
                          <SelectItem value="earrings">Earrings</SelectItem>
                          <SelectItem value="bracelets">Bracelets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price</label>
                      <Input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => handleFormChange('price', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Original Price (Optional)</label>
                      <Input
                        type="number"
                        value={productForm.originalPrice}
                        onChange={(e) => handleFormChange('originalPrice', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Material</label>
                    <Input
                      value={productForm.material}
                      onChange={(e) => handleFormChange('material', e.target.value)}
                      placeholder="e.g., Rose Gold, Diamond"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={productForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <Input
                      value={productForm.images[0]}
                      onChange={(e) => handleFormChange('images', [e.target.value])}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setEditingProduct(null)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProduct} className="luxury-gradient text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Product Dialog */}
            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Name</label>
                      <Input
                        value={productForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select value={productForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rings">Rings</SelectItem>
                          <SelectItem value="necklaces">Necklaces</SelectItem>
                          <SelectItem value="earrings">Earrings</SelectItem>
                          <SelectItem value="bracelets">Bracelets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price</label>
                      <Input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => handleFormChange('price', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Original Price (Optional)</label>
                      <Input
                        type="number"
                        value={productForm.originalPrice}
                        onChange={(e) => handleFormChange('originalPrice', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Material</label>
                    <Input
                      value={productForm.material}
                      onChange={(e) => handleFormChange('material', e.target.value)}
                      placeholder="e.g., Rose Gold, Diamond"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={productForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <Input
                      value={productForm.images[0]}
                      onChange={(e) => handleFormChange('images', [e.target.value])}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleAddProduct} className="luxury-gradient text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Customer Management</h2>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                              <UserCheck className="h-5 w-5 text-gold-600" />
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">ID: {user.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {user.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {user.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>{user.totalOrders}</TableCell>
                        <TableCell>${user.totalSpent.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={userStatusColors[user.status]}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="hover:scale-110 transition-transform duration-200"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Customer Details - {user.name}</DialogTitle>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                      <div>
                                        <h4 className="font-semibold mb-3">Personal Information</h4>
                                        <div className="space-y-2 text-sm">
                                          <div><strong>Name:</strong> {selectedUser.name}</div>
                                          <div><strong>Email:</strong> {selectedUser.email}</div>
                                          <div><strong>Phone:</strong> {selectedUser.phone}</div>
                                          <div><strong>Status:</strong> 
                                            <Badge className={`ml-2 ${userStatusColors[selectedUser.status]}`}>
                                              {selectedUser.status}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-3">Account Statistics</h4>
                                        <div className="space-y-2 text-sm">
                                          <div><strong>Join Date:</strong> {new Date(selectedUser.joinDate).toLocaleDateString()}</div>
                                          <div><strong>Total Orders:</strong> {selectedUser.totalOrders}</div>
                                          <div><strong>Total Spent:</strong> ${selectedUser.totalSpent.toLocaleString()}</div>
                                          <div><strong>Last Login:</strong> {new Date(selectedUser.lastLogin).toLocaleDateString()}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-3">Recent Orders</h4>
                                      <div className="space-y-2">
                                        {orders.filter(order => order.customer === selectedUser.name).slice(0, 3).map((order) => (
                                          <div key={order.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span className="text-sm">{order.id}</span>
                                            <span className="text-sm">${order.amount}</span>
                                            <Badge className={statusColors[order.status]}>
                                              {order.status}
                                            </Badge>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="returns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Returns & Refunds</h2>
              <div className="text-sm text-gray-600">
                Return Rate: {returnRate}% | Total Returns: {totalReturns}
              </div>
            </div>

            {/* Return Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <RotateCcw className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {orders.filter(o => o.status === 'returned').length}
                  </div>
                  <div className="text-sm text-gray-600">Total Returns</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ${orders.filter(o => o.status === 'returned').reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Return Value</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <TrendingDown className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {returnRate}%
                  </div>
                  <div className="text-sm text-gray-600">Return Rate</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    3.2
                  </div>
                  <div className="text-sm text-gray-600">Avg Days to Return</div>
                </CardContent>
              </Card>
            </div>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Returned Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.filter(order => order.status === 'returned').map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items[0]?.name}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>${order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">Size issue</span>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-orange-100 text-orange-800">
                            Processing Refund
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Store Settings</h2>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Package className="h-24 w-24 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Store Configuration
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Manage store settings, payment methods, shipping options, and more.
                  </p>
                  <Button className="luxury-gradient text-white hover:scale-105 transition-transform duration-200">
                    Configure Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}