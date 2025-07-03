'use client';

import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, DollarSign, ShoppingBag, Users, Package, BarChart3, PieChart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { adminPaddingConfig } from '../../lib/admin-padding-data';

const reportTypes = [
  {
    id: 'sales',
    name: 'Sales Report',
    description: 'Detailed sales analysis and revenue breakdown',
    icon: DollarSign,
    lastGenerated: '2024-01-17',
    frequency: 'Daily',
    category: 'Financial'
  },
  {
    id: 'inventory',
    name: 'Inventory Report',
    description: 'Stock levels, low stock alerts, and inventory valuation',
    icon: Package,
    lastGenerated: '2024-01-17',
    frequency: 'Weekly',
    category: 'Operations'
  },
  {
    id: 'customers',
    name: 'Customer Report',
    description: 'Customer analytics, segmentation, and behavior analysis',
    icon: Users,
    lastGenerated: '2024-01-16',
    frequency: 'Monthly',
    category: 'Marketing'
  },
  {
    id: 'orders',
    name: 'Orders Report',
    description: 'Order processing, fulfillment, and shipping analytics',
    icon: ShoppingBag,
    lastGenerated: '2024-01-17',
    frequency: 'Daily',
    category: 'Operations'
  },
  {
    id: 'products',
    name: 'Product Performance',
    description: 'Best sellers, product analytics, and category performance',
    icon: TrendingUp,
    lastGenerated: '2024-01-16',
    frequency: 'Weekly',
    category: 'Marketing'
  },
  {
    id: 'financial',
    name: 'Financial Report',
    description: 'Revenue, expenses, profit margins, and financial KPIs',
    icon: FileText,
    lastGenerated: '2024-01-15',
    frequency: 'Monthly',
    category: 'Financial'
  },
  {
    id: 'analytics',
    name: 'Web Analytics',
    description: 'Website traffic, conversion rates, and user behavior',
    icon: BarChart3,
    lastGenerated: '2024-01-16',
    frequency: 'Weekly',
    category: 'Marketing'
  },
  {
    id: 'returns',
    name: 'Returns & Refunds',
    description: 'Return rates, refund analysis, and quality insights',
    icon: PieChart,
    lastGenerated: '2024-01-15',
    frequency: 'Monthly',
    category: 'Operations'
  }
];

const recentReports = [
  {
    id: 'RPT-001',
    name: 'Daily Sales Report - Jan 17, 2024',
    type: 'Sales',
    category: 'Financial',
    generatedAt: '2024-01-17T09:00:00Z',
    size: '2.3 MB',
    format: 'PDF',
    status: 'completed'
  },
  {
    id: 'RPT-002',
    name: 'Weekly Inventory Report - Week 3',
    type: 'Inventory',
    category: 'Operations',
    generatedAt: '2024-01-15T08:30:00Z',
    size: '1.8 MB',
    format: 'Excel',
    status: 'completed'
  },
  {
    id: 'RPT-003',
    name: 'Customer Analytics - December 2023',
    type: 'Customers',
    category: 'Marketing',
    generatedAt: '2024-01-01T10:00:00Z',
    size: '3.1 MB',
    format: 'PDF',
    status: 'completed'
  },
  {
    id: 'RPT-004',
    name: 'Product Performance - Q4 2023',
    type: 'Products',
    category: 'Marketing',
    generatedAt: '2023-12-31T16:00:00Z',
    size: '2.7 MB',
    format: 'Excel',
    status: 'completed'
  },
  {
    id: 'RPT-005',
    name: 'Financial Summary - December 2023',
    type: 'Financial',
    category: 'Financial',
    generatedAt: '2023-12-31T18:00:00Z',
    size: '1.5 MB',
    format: 'PDF',
    status: 'completed'
  },
  {
    id: 'RPT-006',
    name: 'Web Analytics - January 2024',
    type: 'Analytics',
    category: 'Marketing',
    generatedAt: '2024-01-16T12:00:00Z',
    size: '4.2 MB',
    format: 'Excel',
    status: 'processing'
  }
];

const scheduledReports = [
  {
    id: 'SCH-001',
    name: 'Daily Sales Summary',
    type: 'Sales',
    frequency: 'Daily',
    nextRun: '2024-01-18T09:00:00Z',
    recipients: ['admin@luxejewelry.com', 'sales@luxejewelry.com'],
    format: 'PDF',
    status: 'active'
  },
  {
    id: 'SCH-002',
    name: 'Weekly Inventory Alert',
    type: 'Inventory',
    frequency: 'Weekly',
    nextRun: '2024-01-22T08:00:00Z',
    recipients: ['inventory@luxejewelry.com'],
    format: 'Excel',
    status: 'active'
  },
  {
    id: 'SCH-003',
    name: 'Monthly Customer Report',
    type: 'Customers',
    frequency: 'Monthly',
    nextRun: '2024-02-01T10:00:00Z',
    recipients: ['marketing@luxejewelry.com'],
    format: 'PDF',
    status: 'paused'
  }
];

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('last30days');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [generatingReport, setGeneratingReport] = useState(null);

  const handleGenerateReport = (reportType) => {
    setGeneratingReport(reportType);
    
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(null);
      // In a real app, this would trigger a download
      alert(`${reportType.name} generated successfully!`);
    }, 2000);
  };

  const handleDownloadReport = (report) => {
    // Simulate download
    alert(`Downloading ${report.name}...`);
  };

  const handleScheduleReport = (reportType) => {
    alert(`Scheduling ${reportType.name}...`);
  };

  const filteredReportTypes = selectedCategory === 'all' 
    ? reportTypes 
    : reportTypes.filter(report => report.category === selectedCategory);

  const categories = ['Financial', 'Operations', 'Marketing'];

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Generate comprehensive business reports and track key performance metrics
          </p>
        </div>

        {/* Report Generation Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Report Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period
                </label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="thismonth">This Month</SelectItem>
                    <SelectItem value="lastmonth">Last Month</SelectItem>
                    <SelectItem value="thisquarter">This Quarter</SelectItem>
                    <SelectItem value="thisyear">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full luxury-gradient text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available Reports</TabsTrigger>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          {/* Available Reports */}
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReportTypes.map((report) => {
                const Icon = report.icon;
                const isGenerating = generatingReport?.id === report.id;
                
                return (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className={adminPaddingConfig.cards.default}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{report.name}</h3>
                            <p className="text-sm text-gray-600">{report.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{report.category}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Generated:</span>
                          <span className="font-medium">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Frequency:</span>
                          <span className="font-medium">{report.frequency}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleGenerateReport(report)}
                          disabled={isGenerating}
                          className="flex-1"
                          variant="outline"
                        >
                          {isGenerating ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                              Generating...
                            </div>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Generate
                            </>
                          )}
                        </Button>
                        <Button 
                          onClick={() => handleScheduleReport(report)}
                          variant="outline"
                          size="sm"
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Recent Reports */}
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.category}</TableCell>
                        <TableCell>{new Date(report.generatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {report.format}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadReport(report)}
                            disabled={report.status !== 'completed'}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Reports */}
          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Scheduled Reports</CardTitle>
                  <Button className="luxury-gradient text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    New Schedule
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>{new Date(report.nextRun).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {report.recipients.length} recipient{report.recipients.length !== 1 ? 's' : ''}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {report.format}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Delete
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
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-sm text-gray-600">Total Reports Generated</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="text-center">
                <Download className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-gray-600">Downloads This Month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Scheduled Reports</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className={adminPaddingConfig.cards.default}>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-gold-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">24.5 MB</p>
                <p className="text-sm text-gray-600">Total Storage Used</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}