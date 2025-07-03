'use client';

import React, { useState } from 'react';
import { Settings, Store, Mail, Shield, CreditCard, Truck, Bell, Users, Save, Upload } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { adminPaddingConfig } from '../../lib/admin-padding-data';

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: 'Luxe Jewelry Store',
    description: 'Premium jewelry and accessories for every occasion',
    email: 'hello@luxejewelry.com',
    phone: '+1 (555) 123-4567',
    address: '123 Diamond District, New York, NY 10036',
    currency: 'USD',
    timezone: 'America/New_York',
    logo: '',
    favicon: ''
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@luxejewelry.com',
    smtpPassword: '',
    fromName: 'Luxe Jewelry Store',
    fromEmail: 'noreply@luxejewelry.com'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    stripePublishableKey: '',
    stripeSecretKey: '',
    paypalEnabled: false,
    paypalClientId: '',
    paypalClientSecret: ''
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 1000,
    standardShippingRate: 50,
    expressShippingRate: 100,
    internationalShippingRate: 150,
    processingTime: '1-2 business days',
    shippingZones: ['US', 'Canada', 'International']
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    maxLoginAttempts: 5,
    accountLockoutTime: 15
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    inventoryAlerts: true,
    reviewNotifications: true,
    marketingEmails: false,
    systemUpdates: true
  });

  const handleSaveSettings = (settingsType) => {
    // In a real app, this would save to the backend
    alert(`${settingsType} settings saved successfully!`);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${adminPaddingConfig.layout.container}`}>
      {/* Header */}
      <div className={adminPaddingConfig.spacing.section}>
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Store Settings
          </h1>
          <p className="text-lg text-gray-600">
            Configure your store settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="h-5 w-5 mr-2" />
                  General Store Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Store Name</label>
                    <Input
                      value={storeSettings.name}
                      onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <Input
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Store Description</label>
                  <Textarea
                    value={storeSettings.description}
                    onChange={(e) => setStoreSettings({...storeSettings, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      value={storeSettings.phone}
                      onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <Select value={storeSettings.currency} onValueChange={(value) => setStoreSettings({...storeSettings, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Store Address</label>
                  <Input
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Store Logo</label>
                    <div className="flex items-center space-x-4">
                      <Input type="file" accept="image/*" />
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Favicon</label>
                    <div className="flex items-center space-x-4">
                      <Input type="file" accept="image/*" />
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSaveSettings('General')} className="luxury-gradient text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Host</label>
                    <Input
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Port</label>
                    <Input
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Username</label>
                    <Input
                      value={emailSettings.smtpUser}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Password</label>
                    <Input
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">From Name</label>
                    <Input
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">From Email</label>
                    <Input
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSaveSettings('Email')} className="luxury-gradient text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stripe Settings */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Stripe</h3>
                    <Switch
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(value) => setPaymentSettings({...paymentSettings, stripeEnabled: value})}
                    />
                  </div>
                  {paymentSettings.stripeEnabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Publishable Key</label>
                        <Input
                          value={paymentSettings.stripePublishableKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripePublishableKey: e.target.value})}
                          placeholder="pk_test_..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Secret Key</label>
                        <Input
                          type="password"
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                          placeholder="sk_test_..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PayPal Settings */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">PayPal</h3>
                    <Switch
                      checked={paymentSettings.paypalEnabled}
                      onCheckedChange={(value) => setPaymentSettings({...paymentSettings, paypalEnabled: value})}
                    />
                  </div>
                  {paymentSettings.paypalEnabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Client ID</label>
                        <Input
                          value={paymentSettings.paypalClientId}
                          onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Client Secret</label>
                        <Input
                          type="password"
                          value={paymentSettings.paypalClientSecret}
                          onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientSecret: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button onClick={() => handleSaveSettings('Payment')} className="luxury-gradient text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Payment Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Shipping Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Free Shipping Threshold ($)</label>
                    <Input
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) => setShippingSettings({...shippingSettings, freeShippingThreshold: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Processing Time</label>
                    <Input
                      value={shippingSettings.processingTime}
                      onChange={(e) => setShippingSettings({...shippingSettings, processingTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Standard Shipping ($)</label>
                    <Input
                      type="number"
                      value={shippingSettings.standardShippingRate}
                      onChange={(e) => setShippingSettings({...shippingSettings, standardShippingRate: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Express Shipping ($)</label>
                    <Input
                      type="number"
                      value={shippingSettings.expressShippingRate}
                      onChange={(e) => setShippingSettings({...shippingSettings, expressShippingRate: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">International Shipping ($)</label>
                    <Input
                      type="number"
                      value={shippingSettings.internationalShippingRate}
                      onChange={(e) => setShippingSettings({...shippingSettings, internationalShippingRate: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSaveSettings('Shipping')} className="luxury-gradient text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Shipping Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(value) => setSecuritySettings({...securitySettings, twoFactorEnabled: value})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Require Special Characters</h4>
                      <p className="text-sm text-gray-600">Passwords must contain special characters</p>
                    </div>
                    <Switch
                      checked={securitySettings.requireSpecialChars}
                      onCheckedChange={(value) => setSecuritySettings({...securitySettings, requireSpecialChars: value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Password Length</label>
                    <Input
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                    <Input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSaveSettings('Security')} className="luxury-gradient text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                        <p className="text-sm text-gray-600">
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'orderNotifications' && 'Get notified about new orders'}
                          {key === 'inventoryAlerts' && 'Alerts for low stock items'}
                          {key === 'reviewNotifications' && 'Notifications for new reviews'}
                          {key === 'marketingEmails' && 'Marketing and promotional emails'}
                          {key === 'systemUpdates' && 'System maintenance and updates'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(newValue) => setNotificationSettings({...notificationSettings, [key]: newValue})}
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={() => handleSaveSettings('Notification')} className="luxury-gradient text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}