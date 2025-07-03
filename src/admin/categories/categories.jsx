'use client';

import React, { useEffect, useState } from 'react';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { adminPaddingConfig } from '../../lib/admin-padding-data';
import { useStore } from '../../lib/store';
import axios from 'axios';

export default function AdminCategoriesPage() {
    const { user } = useStore();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    categoryImage: '',
    parentId: '',
    sortOrder: 0,
    metaTitle: '',
    isActive: true,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    console.log("first fetchCategories");
    const token = user?.token;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        console.log(token, "userToken", res.data);
        setCategories(res.data.categories);
      })
      .catch(err => {
        setCategories([]);
        console.error("Fetch categories error:", err);
      });
  };

  const handleView = (cat) => {
    setSelectedCategory(cat);
    setIsViewing(true);
  };

  const handleEdit = (cat) => {
    setCategoryForm(cat);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const token = user?.token;
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCategories();
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const formData = new FormData();
      Object.entries(categoryForm).forEach(([key, value]) => {
        if (key === 'categoryImage' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsAddingCategory(false);
      clearCategoryForm();
      fetchCategories();
    } catch (err) {
      alert('Failed to add category');
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const formData = new FormData();
      Object.entries(categoryForm).forEach(([key, value]) => {
        if (key === 'categoryImage' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryForm.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsEditing(false);
      setImagePreview('');
      clearCategoryForm();
      fetchCategories();
    } catch (err) {
      alert('Failed to update category');
    }
  };

  const clearCategoryForm = () => {
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      categoryImage: '',
      parentId: '',
      sortOrder: 0,
      metaTitle: '',
      isActive: true,
    });
    setImagePreview('');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
              Category Management
            </h1>
            <p className="text-lg text-gray-600">
              Manage your product categories
            </p>
          </div>
          <Button
            onClick={() => setIsAddingCategory(true)}
            className="luxury-gradient text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Category
          </Button>
        </div>

        {/* Category List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Categories ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sort Order</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell>
                        {cat.image && (
                          <img
                            src={
                              cat.image.startsWith('http')
                                ? cat.image
                                : `${process.env.NEXT_PUBLIC_API_URL}${cat.image.startsWith('/') ? cat.image : '/uploads/' + cat.image}`
                            }
                            alt={cat.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-semibold">{cat.name}</TableCell>
                      <TableCell>{cat.slug}</TableCell>
                      <TableCell>{cat.description}</TableCell>
                      <TableCell>{cat.sortOrder}</TableCell>
                      <TableCell>
                        {cat.isActive ? (
                          <span className="text-green-600 font-bold">Yes</span>
                        ) : (
                          <span className="text-red-600 font-bold">No</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleView(cat)}>
                           <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(cat)}>
                             <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(cat.id)}>
                           <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )))
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Category Dialog */}
        <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={handleAddCategory}
            >
              {/* One row, two inputs: Name and Slug */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <Input
                    name="name"
                    value={categoryForm.name}
                    onChange={e => setCategoryForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    name="slug"
                    value={categoryForm.slug}
                    onChange={e => setCategoryForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="category-slug"
                    required
                  />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  name="description"
                  value={categoryForm.description}
                  onChange={e => setCategoryForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Enter category description"
                  rows={2}
                />
              </div>
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Image Upload</label>
                <Input
                  name="categoryImage"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      setCategoryForm(f => ({ ...f, categoryImage: file }));
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded border"
                  />
                )}
              </div>
              {/* Parent, Sort Order, Meta Title, Active */}
              <div className="flex gap-4">
                {/* <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Parent Category</label>
                  <select
                    name="parentId"
                    value={categoryForm.parentId}
                    onChange={e => setCategoryForm(f => ({ ...f, parentId: e.target.value }))}
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="">None</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div> */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <Input
                    name="sortOrder"
                    type="number"
                    value={categoryForm.sortOrder}
                    onChange={e => setCategoryForm(f => ({ ...f, sortOrder: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <Input
                  name="metaTitle"
                  value={categoryForm.metaTitle}
                  onChange={e => setCategoryForm(f => ({ ...f, metaTitle: e.target.value }))}
                  placeholder="Meta title for SEO"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={categoryForm.isActive}
                  onChange={e => setCategoryForm(f => ({ ...f, isActive: e.target.checked }))}
                  id="isActive"
                />
                <label htmlFor="isActive" className="text-sm font-medium">Active</label>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setIsAddingCategory(false);
                    clearCategoryForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="luxury-gradient text-white">
                  Add Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Category Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={handleEditCategory}
            >
              {/* One row, two inputs: Name and Slug */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <Input
                    name="name"
                    value={categoryForm.name}
                    onChange={e => setCategoryForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    name="slug"
                    value={categoryForm.slug}
                    onChange={e => setCategoryForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="category-slug"
                    required
                  />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  name="description"
                  value={categoryForm.description}
                  onChange={e => setCategoryForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Enter category description"
                  rows={2}
                />
              </div>
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Image Upload</label>
                <Input
                  name="categoryImage"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      setCategoryForm(f => ({ ...f, categoryImage: file }));
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded border"
                  />
                )}
              </div>
              {/* Parent, Sort Order, Meta Title, Active */}
              <div className="flex gap-4">
                {/* <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Parent Category</label>
                  <select
                    name="parentId"
                    value={categoryForm.parentId}
                    onChange={e => setCategoryForm(f => ({ ...f, parentId: e.target.value }))}
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="">None</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div> */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <Input
                    name="sortOrder"
                    type="number"
                    value={categoryForm.sortOrder}
                    onChange={e => setCategoryForm(f => ({ ...f, sortOrder: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <Input
                  name="metaTitle"
                  value={categoryForm.metaTitle}
                  onChange={e => setCategoryForm(f => ({ ...f, metaTitle: e.target.value }))}
                  placeholder="Meta title for SEO"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={categoryForm.isActive}
                  onChange={e => setCategoryForm(f => ({ ...f, isActive: e.target.checked }))}
                  id="isActive"
                />
                <label htmlFor="isActive" className="text-sm font-medium">Active</label>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" type="button" onClick={() => {setIsEditing(false);    clearCategoryForm();}}>
                  Cancel
                </Button>
                <Button type="submit" className="luxury-gradient text-white">
                  Update Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Category Dialog */}
        <Dialog open={isViewing} onOpenChange={setIsViewing}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Category Details</DialogTitle>
            </DialogHeader>
            {selectedCategory && (
              <div>
                <img
                  src={
                    selectedCategory.image.startsWith('http')
                      ? selectedCategory.image
                      : `${process.env.NEXT_PUBLIC_API_URL}${selectedCategory.image.startsWith('/') ? selectedCategory.image : '/uploads/' + selectedCategory.image}`
                  }
                  alt={selectedCategory.name}
                  className="w-24 h-24 object-cover rounded mb-4"
                />
                <div><b>Name:</b> {selectedCategory.name}</div>
                <div><b>Slug:</b> {selectedCategory.slug}</div>
                <div><b>Description:</b> {selectedCategory.description}</div>
                <div><b>Sort Order:</b> {selectedCategory.sortOrder}</div>
                <div><b>Active:</b> {selectedCategory.isActive ? 'Yes' : 'No'}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}