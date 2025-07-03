'use client';

import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter, Edit, Trash2, Eye, Star, Image } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { adminPaddingConfig } from '../../lib/admin-padding-data';
import axios from 'axios';
import { useStore } from '../../lib/store';

export default function AdminProductsPage() {
      const { user } = useStore();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    originalPrice: '',
    categoryId: '',
    sku: '',
    material: '',
    images: [],
    isFeatured: false,
    qty: '',
    metaTitle: '',
    metaDescription: ''
  });
const [categories, setCategories] = useState([]);

const fetchCategories = async () => {
  const token = user?.token;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data.categories); // Make sure your API returns an array of categories
  } catch (err) {
    setCategories([]);
    console.error("Fetch categories error:", err);
  }
};

useEffect(() => {
  fetchCategories();
}, []);
  // Fetch products from API on mount
  useEffect(() => {
    const token = user?.token;
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`,{ headers: { Authorization: `Bearer ${token}` },});
        setProducts(res.data.products); // Adjust if your API returns { data: [...] }
      } catch (err) {
        alert('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'inStock' && product.inStock) ||
      (statusFilter === 'outOfStock' && !product.inStock) ||
      (statusFilter === 'featured' && product.featured);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ADD PRODUCT API CALL
  const handleAddProduct = async () => {
    const token = user?.token;
    try {
      const formData = new FormData();
      Object.entries(productForm).forEach(([key, value]) => {
        if (key === 'images') {
          value.slice(0, 5).forEach(img => formData.append('productImages', img));
        } else {
          formData.append(key, value);
        }
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, formData, {
        headers: { /*'Content-Type': 'multipart/form-data'*/ Authorization: `Bearer ${token}` }
      });
      setIsAddingProduct(false);
      resetForm();
      // Optionally: fetch products again here
    } catch (err) {
      console.log(err,"errors::--")
      // alert('Failed to add product');
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      categoryId: product.categoryId,
      sku: product.sku,
      material: product.material,
      images: product.images,
      isFeatured: product.isFeatured || false,
      qty: product.qty.toString(),
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription
    });
  };

  const handleUpdateProduct = () => {
    const updatedProduct = {
      ...selectedProduct,
      ...productForm,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined
    };
    
    setProducts(products.map(p => p.id === selectedProduct.id ? updatedProduct : p));
    setSelectedProduct(null);
    resetForm();
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      price: '',
      originalPrice: '',
      categoryId: '',
      sku: '',
      material: '',
      images: [],
      isFeatured: false,
      qty: '',
      metaTitle: '',
      metaDescription: ''
    });
  };


  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
              Product Management
            </h1>
            <p className="text-lg text-gray-600">
              Manage your jewelry inventory and product catalog
            </p>
          </div>
          <Button 
            onClick={() => setIsAddingProduct(true)}
            className="luxury-gradient text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Star className="h-8 w-8 text-gold-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {products.filter(p => p.featured).length} */}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {products.filter(p => p.inStock).length} */}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Package className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {products.filter(p => !p.inStock).length} */}
                  </p>
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
                    placeholder="Search products..."
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
                    <SelectItem key={category} value={category.id}>
                      {category.name}
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
                  <SelectItem value="inStock">In Stock</SelectItem>
                  <SelectItem value="outOfStock">Out of Stock</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.category.name}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-semibold">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.inStock ? 'default' : 'destructive'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{product.rating}</span>
                        <span className="text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.featured && (
                        <Badge className="bg-gold-100 text-gold-800">Featured</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-600 hover:text-red-700"
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
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm 
            formData={productForm}
            setFormData={setProductForm}
            onSubmit={handleAddProduct}
            onCancel={() => setIsAddingProduct(false)}
            categories={categories}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm 
            formData={productForm}
            setFormData={setProductForm}
            onSubmit={handleUpdateProduct}
            onCancel={() => setSelectedProduct(null)}
            categories={categories}
            isEdit={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Product Form Component
function ProductForm({ formData, setFormData, onSubmit, onCancel, categories, isEdit = false }) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setFormData(prev => ({ ...prev, images: files }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <Input
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <Input
            value={formData.slug}
            onChange={e => handleInputChange('slug', e.target.value)}
            placeholder="product-slug"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Short Description</label>
        <Input
          value={formData.shortDescription}
          onChange={e => handleInputChange('shortDescription', e.target.value)}
          placeholder="Short description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          value={formData.description}
          onChange={e => handleInputChange('description', e.target.value)}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <Input
            type="number"
            value={formData.price}
            onChange={e => handleInputChange('price', e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Original Price</label>
          <Input
            type="number"
            value={formData.originalPrice}
            onChange={e => handleInputChange('originalPrice', e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={formData.categoryId} onValueChange={value => handleInputChange('categoryId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">SKU</label>
          <Input
            value={formData.sku}
            onChange={e => handleInputChange('sku', e.target.value)}
            placeholder="Stock Keeping Unit"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Material</label>
          <Input
            value={formData.material}
            onChange={e => handleInputChange('material', e.target.value)}
            placeholder="e.g., Rose Gold, Diamond"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <Input
            type="number"
            value={formData.qty}
            onChange={e => handleInputChange('qty', e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Meta Title</label>
        <Input
          value={formData.metaTitle}
          onChange={e => handleInputChange('metaTitle', e.target.value)}
          placeholder="Meta title for SEO"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Meta Description</label>
        <Textarea
          value={formData.metaDescription}
          onChange={e => handleInputChange('metaDescription', e.target.value)}
          placeholder="Meta description for SEO"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Product Images (max 5)</label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />
        {formData.images && formData.images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={img instanceof File ? URL.createObjectURL(img) : img}
                alt={`Preview ${idx + 1}`}
                className="w-16 h-16 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={e => handleInputChange('isFeatured', e.target.checked)}
            className="mr-2"
          />
          Featured Product
        </label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit} className="luxury-gradient text-white">
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </div>
  );
}