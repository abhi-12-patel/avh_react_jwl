'use client';

import React, { useState } from 'react';
import { Mail, Users, TrendingUp, Target, Calendar, Send, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { adminPaddingConfig } from '../../lib/admin-padding-data';

const mockCampaigns = [
  {
    id: 'CAMP-001',
    name: 'Valentine\'s Day Collection',
    type: 'email',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-14',
    audience: 'All Customers',
    sent: 2450,
    opened: 1225,
    clicked: 245,
    conversions: 89,
    revenue: 12450
  },
  {
    id: 'CAMP-002',
    name: 'New Customer Welcome Series',
    type: 'email',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    audience: 'New Customers',
    sent: 156,
    opened: 124,
    clicked: 45,
    conversions: 23,
    revenue: 3450
  },
  {
    id: 'CAMP-003',
    name: 'Premium Customer Exclusive',
    type: 'email',
    status: 'completed',
    startDate: '2024-01-10',
    endDate: '2024-01-17',
    audience: 'Premium Customers',
    sent: 89,
    opened: 78,
    clicked: 34,
    conversions: 18,
    revenue: 8900
  },
  {
    id: 'CAMP-004',
    name: 'Abandoned Cart Recovery',
    type: 'automation',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    audience: 'Cart Abandoners',
    sent: 345,
    opened: 189,
    clicked: 67,
    conversions: 34,
    revenue: 5670
  }
];

const mockSegments = [
  {
    id: 'SEG-001',
    name: 'Premium Customers',
    description: 'Customers who have spent over $5,000',
    count: 89,
    criteria: 'Total spent > $5,000'
  },
  {
    id: 'SEG-002',
    name: 'New Customers',
    description: 'Customers who joined in the last 30 days',
    count: 156,
    criteria: 'Join date < 30 days ago'
  },
  {
    id: 'SEG-003',
    name: 'Frequent Buyers',
    description: 'Customers with 5+ orders',
    count: 234,
    criteria: 'Order count >= 5'
  },
  {
    id: 'SEG-004',
    name: 'Inactive Customers',
    description: 'No purchase in last 6 months',
    count: 67,
    criteria: 'Last order > 6 months ago'
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  draft: 'bg-gray-100 text-gray-800',
  paused: 'bg-yellow-100 text-yellow-800'
};

export default function AdminMarketingPage() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [segments, setSegments] = useState(mockSegments);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    type: 'email',
    audience: '',
    subject: '',
    content: '',
    startDate: '',
    endDate: ''
  });

  const getMarketingStats = () => {
    const totalSent = campaigns.reduce((sum, campaign) => sum + campaign.sent, 0);
    const totalOpened = campaigns.reduce((sum, campaign) => sum + campaign.opened, 0);
    const totalClicked = campaigns.reduce((sum, campaign) => sum + campaign.clicked, 0);
    const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
    
    const openRate = totalSent > 0 ? (totalOpened / totalSent * 100).toFixed(1) : 0;
    const clickRate = totalOpened > 0 ? (totalClicked / totalOpened * 100).toFixed(1) : 0;
    
    return {
      totalSent,
      totalOpened,
      totalClicked,
      totalRevenue,
      openRate,
      clickRate,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length
    };
  };

  const stats = getMarketingStats();

  const handleCreateCampaign = () => {
    const newCampaign = {
      id: `CAMP-${String(campaigns.length + 1).padStart(3, '0')}`,
      ...campaignForm,
      status: 'draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      revenue: 0
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setIsCreatingCampaign(false);
    setCampaignForm({
      name: '',
      type: 'email',
      audience: '',
      subject: '',
      content: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
              Marketing Center
            </h1>
            <p className="text-lg text-gray-600">
              Manage campaigns, segments, and marketing automation
            </p>
          </div>
          <Button 
            onClick={() => setIsCreatingCampaign(true)}
            className="luxury-gradient text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sent</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSent.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Open Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.openRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <Target className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Click Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.clickRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-gold-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaigns ({campaigns.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => {
                      const openRate = campaign.sent > 0 ? (campaign.opened / campaign.sent * 100).toFixed(1) : 0;
                      const clickRate = campaign.opened > 0 ? (campaign.clicked / campaign.opened * 100).toFixed(1) : 0;
                      
                      return (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell className="capitalize">{campaign.type}</TableCell>
                          <TableCell>{campaign.audience}</TableCell>
                          <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                          <TableCell>{openRate}%</TableCell>
                          <TableCell>{clickRate}%</TableCell>
                          <TableCell className="font-semibold">${campaign.revenue.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[campaign.status]}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setSelectedCampaign(campaign)}
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
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Customer Segments ({segments.length})</CardTitle>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Segment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {segments.map((segment) => (
                    <Card key={segment.id}>
                      <CardContent className={adminPaddingConfig.cards.default}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{segment.name}</h3>
                            <p className="text-sm text-gray-600">{segment.description}</p>
                          </div>
                          <Badge variant="outline">{segment.count} customers</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          <strong>Criteria:</strong> {segment.criteria}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Campaign
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Marketing Automation</CardTitle>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Automation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className={adminPaddingConfig.cards.default}>
                      <div className="text-center">
                        <Mail className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                        <h3 className="font-semibold mb-2">Welcome Series</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Automated welcome emails for new customers
                        </p>
                        <Badge className="bg-green-100 text-green-800 mb-4">Active</Badge>
                        <div className="text-sm text-gray-600">
                          <p>156 customers enrolled</p>
                          <p>23 conversions this month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className={adminPaddingConfig.cards.default}>
                      <div className="text-center">
                        <Target className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                        <h3 className="font-semibold mb-2">Cart Recovery</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Recover abandoned shopping carts
                        </p>
                        <Badge className="bg-green-100 text-green-800 mb-4">Active</Badge>
                        <div className="text-sm text-gray-600">
                          <p>345 carts targeted</p>
                          <p>34 recoveries this month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className={adminPaddingConfig.cards.default}>
                      <div className="text-center">
                        <Users className="h-12 w-12 mx-auto text-gold-600 mb-4" />
                        <h3 className="font-semibold mb-2">Win-Back Campaign</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Re-engage inactive customers
                        </p>
                        <Badge className="bg-gray-100 text-gray-800 mb-4">Draft</Badge>
                        <div className="text-sm text-gray-600">
                          <p>67 customers targeted</p>
                          <p>Ready to launch</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Campaign Details Dialog */}
      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Campaign Details - {selectedCampaign?.name}</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Campaign Info</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {selectedCampaign.type}</div>
                    <div><strong>Audience:</strong> {selectedCampaign.audience}</div>
                    <div><strong>Start Date:</strong> {new Date(selectedCampaign.startDate).toLocaleDateString()}</div>
                    <div><strong>End Date:</strong> {new Date(selectedCampaign.endDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Sent:</strong> {selectedCampaign.sent.toLocaleString()}</div>
                    <div><strong>Opened:</strong> {selectedCampaign.opened.toLocaleString()}</div>
                    <div><strong>Clicked:</strong> {selectedCampaign.clicked.toLocaleString()}</div>
                    <div><strong>Revenue:</strong> ${selectedCampaign.revenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedCampaign.sent > 0 ? (selectedCampaign.opened / selectedCampaign.sent * 100).toFixed(1) : 0}%
                    </p>
                    <p className="text-sm text-gray-600">Open Rate</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedCampaign.opened > 0 ? (selectedCampaign.clicked / selectedCampaign.opened * 100).toFixed(1) : 0}%
                    </p>
                    <p className="text-sm text-gray-600">Click Rate</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedCampaign.clicked > 0 ? (selectedCampaign.conversions / selectedCampaign.clicked * 100).toFixed(1) : 0}%
                    </p>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Campaign Dialog */}
      <Dialog open={isCreatingCampaign} onOpenChange={setIsCreatingCampaign}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Campaign Name</label>
                <Input
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <Select value={campaignForm.type} onValueChange={(value) => setCampaignForm({...campaignForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="automation">Automation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Audience</label>
              <Select value={campaignForm.audience} onValueChange={(value) => setCampaignForm({...campaignForm, audience: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="premium">Premium Customers</SelectItem>
                  <SelectItem value="new">New Customers</SelectItem>
                  <SelectItem value="inactive">Inactive Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={campaignForm.startDate}
                  onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  type="date"
                  value={campaignForm.endDate}
                  onChange={(e) => setCampaignForm({...campaignForm, endDate: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subject Line</label>
              <Input
                value={campaignForm.subject}
                onChange={(e) => setCampaignForm({...campaignForm, subject: e.target.value})}
                placeholder="Enter email subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                value={campaignForm.content}
                onChange={(e) => setCampaignForm({...campaignForm, content: e.target.value})}
                placeholder="Enter campaign content"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreatingCampaign(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign} className="luxury-gradient text-white">
                Create Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}