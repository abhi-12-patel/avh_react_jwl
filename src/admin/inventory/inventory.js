'use client';

import React, { useState } from 'react';
import { Package, Plus, Search, Filter, Edit, Trash2, Eye, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { mockProducts } from '../../lib/mock-data.js';
import { adminPaddingConfig } from '../../lib/admin-padding-data';

const mockInventoryData = mockProducts.map(product => ({
  ...product,
  sku: `SKU-${product.id.padStart(4, '0')}`,
  stockLevel: Math.floor(Math.random() * 100) + 10,
  lowStockThreshold: 20,
  reorderPoint: 15,
  supplier: ['Luxury Gems Inc.', 'Diamond Direct', 'Gold Crafters', 'Pearl Masters'][Math.floor(Math.random() * 4)],
  location: ['A1-B2', 'B3-C4', 'C5-D6', 'D7-E8'][Math.floor(Math.random() * 4)],
  lastRestocked: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  cost: Math.floor(product.price * 0.6),
  value: 0
})).map(item => ({
  ...item,
  value: item.stockLevel * item.cost,
  status: item.stockLevel <= item.lowStockThreshold ? 'low' : item.stockLevel <= item.reorderPoint ? 'reorder' : 'good'
}));

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(mockInventoryData);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemForm, setItemForm] = useState({
    name: '',
    sku: '',
    category: '',
    stockLevel: '',
    lowStockThreshold: '',
    reorderPoint: '',
    supplier: '',
    location: '',
    cost: '',
    price: ''
  });

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getInventoryStats = () => {
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
    const lowStockItems = inventory.filter(item => item.status === 'low').length;
    const reorderItems = inventory.filter(item => item.status === 'reorder').length;
    const outOfStockItems = inventory.filter(item => item.stockLevel === 0).length;
    
    return {
      totalItems,
      totalValue,
      lowStockItems,
      reorderItems,
      outOfStockItems,
      averageValue: totalValue / totalItems
    };
  };

  const stats = getInventoryStats();

  const handleUpdateStock = (itemId, newStock) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const updatedItem = {
          ...item,
          stockLevel: newStock,
          value: newStock * item.cost,
          status: newStock <= item.lowStockThreshold ? 'low' : 
                 newStock <= item.reorderPoint ? 'reorder' : 'good'
        };
        return updatedItem;
      }
      return item;
    }));
  };

  const handleAddItem = () => {
    const newItem = {
      id: (inventory.length + 1).toString(),
      ...itemForm,
      stockLevel: parseInt(itemForm.stockLevel),
      lowStockThreshold: parseInt(itemForm.lowStockThreshold),
      reorderPoint: parseInt(itemForm.reorderPoint),
      cost: parseFloat(itemForm.cost),
      price: parseFloat(itemForm.price),
      value: parseInt(itemForm.stockLevel) * parseFloat(itemForm.cost),
      lastRestocked: new Date().toISOString().split('T')[0],
      images: ['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=300'],
      description: 'New inventory item',
      material: 'Various',
      inStock: true,
      rating: 4.5,
      reviews: 0
    };
    
    newItem.status = newItem.stockLevel <= newItem.lowStockThreshold ? 'low' : 
                    newItem.stockLevel <= newItem.reorderPoint ? 'reorder' : 'good';
    
    setInventory([...inventory, newItem]);
    setIsAddingItem(false);
    resetForm();
  };

  const resetForm = () => {
    setItemForm({
      name: '',
      sku: '',
      category: '',
      stockLevel: '',
      lowStockThreshold: '',
      reorderPoint: '',
      supplier: '',
      location: '',
      cost: '',
      price: ''
    });
  };

  const statusColors = {
    good: 'bg-green-100 text-green-800',
    low: 'bg-yellow-100 text-yellow-800',
    reorder: 'bg-red-100 text-red-800'
  };

  const categories = ['rings', 'necklaces', 'earrings', 'bracelets'];

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
              Inventory Management
            </h1>
            <p className="text-lg text-gray-600">
              Track stock levels, manage suppliers, and monitor inventory value
            </p>
          </div>
          <Button 
            onClick={() => setIsAddingItem(true)}
            className="luxury-gradient text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.lowStockItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <TrendingDown className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Reorder</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.reorderItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Package className="h-8 w-8 text-gray-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Value</p>
                  <p className="text-2xl font-bold text-gray-900">${Math.round(stats.averageValue).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className={adminPaddingConfig.cards.default}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search by name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="good">Good Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="reorder">Reorder</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">${item.price}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="capitalize">{item.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.stockLevel}</span>
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStock(item.id, item.stockLevel - 1)}
                            disabled={item.stockLevel <= 0}
                          >
                            -
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStock(item.id, item.stockLevel + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[item.status]}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell className="font-semibold">${item.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
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
      </div>

      {/* Item Details Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inventory Item Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Product Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedItem.name}</div>
                    <div><strong>SKU:</strong> {selectedItem.sku}</div>
                    <div><strong>Category:</strong> {selectedItem.category}</div>
                    <div><strong>Price:</strong> ${selectedItem.price}</div>
                    <div><strong>Cost:</strong> ${selectedItem.cost}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Stock Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Current Stock:</strong> {selectedItem.stockLevel}</div>
                    <div><strong>Low Stock Threshold:</strong> {selectedItem.lowStockThreshold}</div>
                    <div><strong>Reorder Point:</strong> {selectedItem.reorderPoint}</div>
                    <div><strong>Total Value:</strong> ${selectedItem.value.toLocaleString()}</div>
                    <div><strong>Last Restocked:</strong> {new Date(selectedItem.lastRestocked).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Supplier & Location</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Supplier:</strong> {selectedItem.supplier}</div>
                    <div><strong>Location:</strong> {selectedItem.location}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Status</h4>
                  <Badge className={statusColors[selectedItem.status]}>
                    {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <Input
                  value={itemForm.name}
                  onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">SKU</label>
                <Input
                  value={itemForm.sku}
                  onChange={(e) => setItemForm({...itemForm, sku: e.target.value})}
                  placeholder="Enter SKU"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={itemForm.category} onValueChange={(value) => setItemForm({...itemForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Supplier</label>
                <Input
                  value={itemForm.supplier}
                  onChange={(e) => setItemForm({...itemForm, supplier: e.target.value})}
                  placeholder="Enter supplier name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stock Level</label>
                <Input
                  type="number"
                  value={itemForm.stockLevel}
                  onChange={(e) => setItemForm({...itemForm, stockLevel: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Low Stock Threshold</label>
                <Input
                  type="number"
                  value={itemForm.lowStockThreshold}
                  onChange={(e) => setItemForm({...itemForm, lowStockThreshold: e.target.value})}
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reorder Point</label>
                <Input
                  type="number"
                  value={itemForm.reorderPoint}
                  onChange={(e) => setItemForm({...itemForm, reorderPoint: e.target.value})}
                  placeholder="15"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Cost</label>
                <Input
                  type="number"
                  step="0.01"
                  value={itemForm.cost}
                  onChange={(e) => setItemForm({...itemForm, cost: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  type="number"
                  step="0.01"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={itemForm.location}
                  onChange={(e) => setItemForm({...itemForm, location: e.target.value})}
                  placeholder="A1-B2"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem} className="luxury-gradient text-white">
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}