'use client';

import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Eye, Flag, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { adminPaddingConfig } from '../../lib/admin-padding-data';

const mockReviews = [
  {
    id: 'REV-001',
    productId: '1',
    productName: 'Eternal Rose Gold Ring',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    rating: 5,
    title: 'Absolutely Beautiful!',
    comment: 'This ring exceeded my expectations. The craftsmanship is incredible and it fits perfectly. I get compliments every time I wear it.',
    date: '2024-01-15',
    status: 'approved',
    helpful: 12,
    reported: 0
  },
  {
    id: 'REV-002',
    productId: '2',
    productName: 'Sapphire Elegance Necklace',
    customerName: 'Michael Chen',
    customerEmail: 'michael@example.com',
    rating: 4,
    title: 'Great quality, fast shipping',
    comment: 'Beautiful necklace, exactly as described. Shipping was very fast. Only minor issue was the clasp feels a bit delicate.',
    date: '2024-01-14',
    status: 'approved',
    helpful: 8,
    reported: 0
  },
  {
    id: 'REV-003',
    productId: '3',
    productName: 'Diamond Drop Earrings',
    customerName: 'Emma Davis',
    customerEmail: 'emma@example.com',
    rating: 5,
    title: 'Perfect for special occasions',
    comment: 'These earrings are stunning! I wore them to my wedding and received so many compliments. The diamonds sparkle beautifully.',
    date: '2024-01-13',
    status: 'approved',
    helpful: 15,
    reported: 0
  },
  {
    id: 'REV-004',
    productId: '1',
    productName: 'Eternal Rose Gold Ring',
    customerName: 'James Wilson',
    customerEmail: 'james@example.com',
    rating: 2,
    title: 'Not as expected',
    comment: 'The ring looks different from the photos. The color seems off and it feels lighter than expected for the price.',
    date: '2024-01-12',
    status: 'pending',
    helpful: 3,
    reported: 1
  },
  {
    id: 'REV-005',
    productId: '4',
    productName: 'Vintage Pearl Bracelet',
    customerName: 'Lisa Brown',
    customerEmail: 'lisa@example.com',
    rating: 5,
    title: 'Elegant and timeless',
    comment: 'This bracelet is exactly what I was looking for. The pearls are beautiful and the vintage design is perfect.',
    date: '2024-01-11',
    status: 'approved',
    helpful: 6,
    reported: 0
  }
];

const statusColors = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800'
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const getReviewStats = () => {
    const totalReviews = reviews.length;
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const pendingReviews = reviews.filter(r => r.status === 'pending').length;
    const reportedReviews = reviews.filter(r => r.reported > 0).length;
    
    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };
    
    return {
      totalReviews,
      avgRating: avgRating.toFixed(1),
      pendingReviews,
      reportedReviews,
      ratingDistribution
    };
  };

  const stats = getReviewStats();

  const handleUpdateReviewStatus = (reviewId, newStatus) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: newStatus }
        : review
    ));
  };

  const handleAddResponse = () => {
    if (selectedReview && adminResponse.trim()) {
      // In a real app, this would save the admin response
      alert('Admin response added successfully!');
      setAdminResponse('');
      setSelectedReview(null);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Reviews Management
          </h1>
          <p className="text-lg text-gray-600">
            Monitor and manage customer reviews and ratings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Flag className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Reported</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.reportedReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = stats.ratingDistribution[rating];
                const percentage = (count / stats.totalReviews * 100).toFixed(1);
                
                return (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-16">{count} ({percentage}%)</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className={adminPaddingConfig.cards.default}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search reviews by product, customer, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews ({filteredReviews.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Helpful</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.productName}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{review.customerName}</div>
                        <div className="text-sm text-gray-500">{review.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm font-medium">{review.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium text-sm">{review.title}</div>
                        <div className="text-sm text-gray-600 truncate">{review.comment}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Select 
                        value={review.status} 
                        onValueChange={(value) => handleUpdateReviewStatus(review.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{review.helpful}</span>
                        {review.reported > 0 && (
                          <>
                            <Flag className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-red-600">{review.reported}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setSelectedReview(review)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
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

      {/* Review Details Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details - {selectedReview?.id}</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Product</h4>
                  <p>{selectedReview.productName}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Customer</h4>
                  <p>{selectedReview.customerName}</p>
                  <p className="text-sm text-gray-600">{selectedReview.customerEmail}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Rating & Review</h4>
                <div className="flex items-center space-x-2 mb-3">
                  {renderStars(selectedReview.rating)}
                  <span className="font-medium">{selectedReview.rating}/5</span>
                </div>
                <h5 className="font-medium mb-2">{selectedReview.title}</h5>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReview.comment}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Date:</span>
                  <p className="font-medium">{new Date(selectedReview.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Helpful votes:</span>
                  <p className="font-medium">{selectedReview.helpful}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <Badge className={statusColors[selectedReview.status]}>
                    {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Admin Response</h4>
                <Textarea
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  placeholder="Write a response to this review..."
                  rows={3}
                />
                <Button 
                  onClick={handleAddResponse}
                  className="mt-2 luxury-gradient text-white"
                  disabled={!adminResponse.trim()}
                >
                  Add Response
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}