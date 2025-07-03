'use client';

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ThumbsUp, ThumbsDown, Flag, User, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { mockProducts } from '../../lib/mock-data';
import { useStore } from '../../lib/store';
import { Input } from '../../components/ui/input';

const mockReviews = [
  {
    id: 'REV-001',
    userId: '1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    title: 'Absolutely Beautiful!',
    comment: 'This ring exceeded my expectations. The craftsmanship is incredible and it fits perfectly. I get compliments every time I wear it. The rose gold has a beautiful warm tone and the diamond sparkles amazingly in any light.',
    date: '2024-01-15',
    helpful: 12,
    notHelpful: 1,
    verified: true,
    images: []
  },
  {
    id: 'REV-002',
    userId: '2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4,
    title: 'Great quality, fast shipping',
    comment: 'Beautiful ring, exactly as described. Shipping was very fast and packaging was excellent. Only minor issue was the sizing - I had to get it resized at a local jeweler, but that\'s pretty common with online jewelry purchases.',
    date: '2024-01-14',
    helpful: 8,
    notHelpful: 0,
    verified: true,
    images: []
  },
  {
    id: 'REV-003',
    userId: '3',
    userName: 'Emma Davis',
    userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    title: 'Perfect for my engagement!',
    comment: 'My fiancé proposed with this ring and it\'s absolutely perfect! The design is elegant and timeless. The quality is outstanding and it feels substantial without being too heavy. Couldn\'t be happier with this choice.',
    date: '2024-01-13',
    helpful: 15,
    notHelpful: 0,
    verified: true,
    images: []
  },
  {
    id: 'REV-004',
    userId: '4',
    userName: 'James Wilson',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 3,
    title: 'Good but not great',
    comment: 'The ring is nice but I expected a bit more for the price. The rose gold color is beautiful but the diamond seems smaller than it appeared in the photos. Customer service was helpful when I had questions though.',
    date: '2024-01-12',
    helpful: 3,
    notHelpful: 2,
    verified: true,
    images: []
  },
  {
    id: 'REV-005',
    userId: '5',
    userName: 'Lisa Brown',
    userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    title: 'Stunning craftsmanship',
    comment: 'This ring is a work of art! The attention to detail is incredible. I\'ve had it for a few weeks now and it still looks as beautiful as the day I received it. The rose gold has a lovely warm tone that complements my skin perfectly.',
    date: '2024-01-11',
    helpful: 9,
    notHelpful: 0,
    verified: true,
    images: []
  }
];

export default function ProductReviewsPage() {
  const params = useParams();
  const productId = params.id;
  const { user } = useStore();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState(mockReviews);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/products">
            <Button className="luxury-gradient text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating.toString() === filterRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default: // newest
        return new Date(b.date) - new Date(a.date);
    }
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  const handleSubmitReview = () => {
    if (!user) {
      alert('Please sign in to write a review');
      navigate('/login');
      return;
    }

    if (!newReview.title.trim() || !newReview.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    const review = {
      id: `REV-${String(reviews.length + 1).padStart(3, '0')}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      notHelpful: 0,
      verified: true,
      images: []
    };

    setTimeout(() => {
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, title: '', comment: '' });
      setIsSubmitting(false);
      alert('Review submitted successfully!');
    }, 1000);
  };

  const handleHelpful = (reviewId, isHelpful) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful: isHelpful ? review.helpful + 1 : review.helpful,
          notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful
        };
      }
      return review;
    }));
  };

  const renderStars = (rating, size = 'h-4 w-4') => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderInteractiveStars = (rating, onRatingChange) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange(i + 1)}
        className="focus:outline-none"
      >
        <Star
          className={`h-6 w-6 transition-colors ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gold-600 transition-colors">Products</Link>
            <span>/</span>
            <Link to={`/products/${productId}`} className="hover:text-gold-600 transition-colors">{product.name}</Link>
            <span>/</span>
            <span className="text-gray-900">Reviews</span>
          </div>
        </nav>

        {/* Product Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                Reviews for {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {renderStars(Math.round(averageRating))}
                  <span className="font-semibold">{averageRating.toFixed(1)}</span>
                  <span className="text-gray-600">({reviews.length} reviews)</span>
                </div>
                <Link to={`/products/${productId}`}>
                  <Button variant="outline">Back to Product</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="highest">Highest Rating</SelectItem>
                        <SelectItem value="lowest">Lowest Rating</SelectItem>
                        <SelectItem value="helpful">Most Helpful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by rating</label>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger>
                        <SelectValue />
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
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                            {review.verified && (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          {renderStars(review.rating)}
                          <span className="font-medium">{review.rating}/5</span>
                        </div>
                        
                        <h4 className="font-semibold text-lg text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                        
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleHelpful(review.id, true)}
                            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          <button
                            onClick={() => handleHelpful(review.id, false)}
                            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <ThumbsDown className="h-4 w-4" />
                            <span>Not helpful ({review.notHelpful})</span>
                          </button>
                          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                            <Flag className="h-4 w-4" />
                            <span>Report</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedReviews.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
                  <p className="text-gray-600">Try adjusting your filters or be the first to write a review!</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {renderStars(Math.round(averageRating), 'h-5 w-5')}
                  </div>
                  <p className="text-gray-600">{reviews.length} total reviews</p>
                </div>

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map(rating => {
                    const count = ratingDistribution[rating];
                    const percentage = reviews.length > 0 ? (count / reviews.length * 100) : 0;
                    
                    return (
                      <div key={rating} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 w-16">
                          <span className="text-sm font-medium">{rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Write Review */}
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center space-x-1">
                        {renderInteractiveStars(newReview.rating, (rating) => 
                          setNewReview({...newReview, rating})
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Title
                      </label>
                      <Input
                        value={newReview.title}
                        onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                        placeholder="Summarize your experience"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <Textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        placeholder="Share your thoughts about this product..."
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handleSubmitReview}
                      disabled={isSubmitting}
                      className="w-full luxury-gradient text-white"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Sign in to write a review</p>
                    <Link to="/login">
                      <Button className="luxury-gradient text-white">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}