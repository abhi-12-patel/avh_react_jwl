'use client';

import React, { useState } from 'react';
import { Bell, Mail, AlertTriangle, CheckCircle, Info, X, Eye, Trash2, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { adminPaddingConfig } from '../../lib/admin-padding-data';

const mockNotifications = [
  {
    id: 'NOT-001',
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-2024-001 has been placed by Sarah Johnson',
    timestamp: '2024-01-17T10:30:00Z',
    read: false,
    priority: 'high',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: 'NOT-002',
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Sapphire Elegance Necklace is running low (3 items remaining)',
    timestamp: '2024-01-17T09:15:00Z',
    read: false,
    priority: 'medium',
    icon: AlertTriangle,
    color: 'text-yellow-600'
  },
  {
    id: 'NOT-003',
    type: 'review',
    title: 'New Customer Review',
    message: 'Michael Chen left a 5-star review for Diamond Drop Earrings',
    timestamp: '2024-01-17T08:45:00Z',
    read: true,
    priority: 'low',
    icon: Info,
    color: 'text-blue-600'
  },
  {
    id: 'NOT-004',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2-4 AM EST',
    timestamp: '2024-01-16T16:00:00Z',
    read: true,
    priority: 'medium',
    icon: Settings,
    color: 'text-purple-600'
  },
  {
    id: 'NOT-005',
    type: 'order',
    title: 'Order Shipped',
    message: 'Order #ORD-2024-002 has been shipped to Emma Davis',
    timestamp: '2024-01-16T14:20:00Z',
    read: true,
    priority: 'low',
    icon: CheckCircle,
    color: 'text-green-600'
  }
];

const notificationSettings = {
  orders: {
    email: true,
    push: true,
    sms: false
  },
  inventory: {
    email: true,
    push: true,
    sms: true
  },
  reviews: {
    email: true,
    push: false,
    sms: false
  },
  system: {
    email: true,
    push: true,
    sms: false
  },
  marketing: {
    email: false,
    push: false,
    sms: false
  }
};

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-blue-100 text-blue-800'
};

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState(notificationSettings);
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesRead = filterRead === 'all' || 
      (filterRead === 'read' && notification.read) ||
      (filterRead === 'unread' && !notification.read);
    
    return matchesType && matchesRead;
  });

  const getNotificationStats = () => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const high = notifications.filter(n => n.priority === 'high').length;
    const today = notifications.filter(n => {
      const notificationDate = new Date(n.timestamp);
      const today = new Date();
      return notificationDate.toDateString() === today.toDateString();
    }).length;
    
    return { total, unread, high, today };
  };

  const stats = getNotificationStats();

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const handleUpdateSettings = (category, channel, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: value
      }
    }));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
              Notifications
            </h1>
            <p className="text-lg text-gray-600">
              Manage system notifications and alerts
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Mark All as Read
            </Button>
            <Button className="luxury-gradient text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.high}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className={adminPaddingConfig.cards.default}>
                <div className="flex flex-col md:flex-row gap-4">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="order">Orders</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="review">Reviews</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterRead} onValueChange={setFilterRead}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications ({filteredNotifications.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <TableRow 
                          key={notification.id}
                          className={!notification.read ? 'bg-blue-50' : ''}
                        >
                          <TableCell>
                            <div className="flex items-center">
                              <Icon className={`h-5 w-5 ${notification.color} mr-2`} />
                              <span className="capitalize">{notification.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{notification.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{notification.message}</TableCell>
                          <TableCell>
                            <Badge className={priorityColors[notification.priority]}>
                              {notification.priority.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatTimestamp(notification.timestamp)}</TableCell>
                          <TableCell>
                            {notification.read ? (
                              <Badge variant="outline">Read</Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800">Unread</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setSelectedNotification(notification)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-600"
                                onClick={() => handleDeleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(settings).map(([category, channels]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-4 capitalize">{category} Notifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(channels).map(([channel, enabled]) => (
                          <div key={channel} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              {channel === 'email' && <Mail className="h-4 w-4" />}
                              {channel === 'push' && <Bell className="h-4 w-4" />}
                              {channel === 'sms' && <AlertTriangle className="h-4 w-4" />}
                              <span className="capitalize">{channel}</span>
                            </div>
                            <Switch
                              checked={enabled}
                              onCheckedChange={(value) => handleUpdateSettings(category, channel, value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <Button className="luxury-gradient text-white">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Notification Details Dialog */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <selectedNotification.icon className={`h-6 w-6 ${selectedNotification.color}`} />
                <div>
                  <h3 className="font-semibold text-lg">{selectedNotification.title}</h3>
                  <Badge className={priorityColors[selectedNotification.priority]}>
                    {selectedNotification.priority.toUpperCase()} PRIORITY
                  </Badge>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{selectedNotification.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <p className="font-medium capitalize">{selectedNotification.type}</p>
                </div>
                <div>
                  <span className="text-gray-600">Time:</span>
                  <p className="font-medium">{new Date(selectedNotification.timestamp).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                {!selectedNotification.read && (
                  <Button 
                    onClick={() => {
                      handleMarkAsRead(selectedNotification.id);
                      setSelectedNotification(null);
                    }}
                    variant="outline"
                  >
                    Mark as Read
                  </Button>
                )}
                <Button 
                  onClick={() => {
                    handleDeleteNotification(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                  variant="outline"
                  className="text-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}