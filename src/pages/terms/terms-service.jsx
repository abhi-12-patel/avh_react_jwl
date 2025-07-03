import React from 'react';
import { FileText, Scale, ShoppingCart, Shield, AlertTriangle, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By accessing and using our website, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, please do not use our services',
        'We reserve the right to modify these terms at any time with notice',
        'Continued use of our services constitutes acceptance of any changes'
      ]
    },
    {
      id: 'products-services',
      title: 'Products and Services',
      icon: ShoppingCart,
      content: [
        'All jewelry items are subject to availability and may be discontinued without notice',
        'Product descriptions and images are provided for informational purposes and may vary slightly',
        'Prices are subject to change without notice and do not include applicable taxes',
        'We reserve the right to limit quantities and refuse service to anyone',
        'Custom jewelry orders are subject to additional terms and conditions'
      ]
    },
    {
      id: 'ordering-payment',
      title: 'Ordering and Payment',
      icon: Scale,
      content: [
        'All orders are subject to acceptance and availability',
        'Payment must be received before order processing and shipment',
        'We accept major credit cards and other payment methods as displayed',
        'You are responsible for providing accurate billing and shipping information',
        'Orders may be cancelled if payment cannot be processed or verified'
      ]
    },
    {
      id: 'shipping-returns',
      title: 'Shipping and Returns',
      icon: Shield,
      content: [
        'Shipping times are estimates and may vary based on location and availability',
        'Risk of loss passes to you upon delivery to the shipping carrier',
        'Returns must be initiated within 30 days of delivery',
        'Items must be in original condition with all certificates and packaging',
        'Custom or personalized items are not eligible for return unless defective'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
            <Scale className="h-8 w-8 text-slate-600" />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Please read these terms carefully before using our services. These terms govern your use of our website and services.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: January 17, 2024
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <section.icon className="h-5 w-5 text-slate-600" />
                  <span className="text-sm font-medium">{section.title}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
              Welcome to Luxe Jewelry Store
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of the Luxe Jewelry Store website and services. 
                By accessing or using our website, making a purchase, or engaging with our services, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms constitute a legally binding agreement between you and Luxe Jewelry Store. 
                If you do not agree to these Terms, you may not access or use our services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to update or modify these Terms at any time without prior notice. 
                Your continued use of our services following any changes constitutes acceptance of those changes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} id={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Important Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <span>User Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Account Security</h4>
                  <p className="text-sm text-gray-600">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Accurate Information</h4>
                  <p className="text-sm text-gray-600">
                    You must provide accurate, current, and complete information when creating an account or making purchases.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Prohibited Uses</h4>
                  <p className="text-sm text-gray-600">
                    You may not use our services for any unlawful purpose or in violation of these Terms.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance</h4>
                  <p className="text-sm text-gray-600">
                    You must comply with all applicable laws and regulations when using our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <span>Intellectual Property</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Content</h4>
                  <p className="text-sm text-gray-600">
                    All content on our website, including text, images, logos, and designs, is owned by Luxe Jewelry Store and protected by copyright.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Limited License</h4>
                  <p className="text-sm text-gray-600">
                    We grant you a limited, non-exclusive license to access and use our website for personal, non-commercial purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Restrictions</h4>
                  <p className="text-sm text-gray-600">
                    You may not reproduce, distribute, modify, or create derivative works from our content without permission.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Trademarks</h4>
                  <p className="text-sm text-gray-600">
                    Our trademarks and service marks may not be used without our prior written consent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warranty and Liability */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <span>Warranty and Limitation of Liability</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Product Warranty</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• We warrant our jewelry against manufacturing defects for one year from purchase</li>
                  <li>• Normal wear and tear is not covered under warranty</li>
                  <li>• Warranty does not cover damage from misuse or accidents</li>
                  <li>• Custom pieces have limited warranty coverage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Limitation of Liability</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Our liability is limited to the purchase price of the item</li>
                  <li>• We are not liable for indirect or consequential damages</li>
                  <li>• Some jurisdictions do not allow limitation of liability</li>
                  <li>• These limitations apply to the fullest extent permitted by law</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dispute Resolution */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Any disputes arising from these Terms or your use of our services will be resolved through binding arbitration 
                in accordance with the rules of the American Arbitration Association.
              </p>
              <p className="text-gray-600 mb-4">
                These Terms are governed by the laws of the State of New York, without regard to conflict of law principles. 
                Any legal action must be brought in the courts of New York County, New York.
              </p>
              <p className="text-gray-600">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <span>Questions About These Terms?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Legal Department</h4>
                <p className="text-gray-600 mb-4">
                  If you have questions about these Terms of Service, please contact our legal department:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> legal@luxejewelry.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Diamond District, New York, NY 10036</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Customer Service</h4>
                <p className="text-gray-600 mb-4">
                  For general questions about our products or services:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> support@luxejewelry.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Hours:</strong> Mon-Fri 9AM-8PM EST</p>
                </div>
                <div className="mt-4">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-2">
              Thank You for Choosing Luxe Jewelry Store
            </h3>
            <p className="text-slate-700 mb-4">
              By using our services, you help us continue to provide exceptional jewelry and customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link tohref="/privacy">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                  Privacy Policy
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}