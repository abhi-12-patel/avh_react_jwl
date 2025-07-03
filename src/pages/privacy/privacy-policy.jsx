import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal information you provide when creating an account, making purchases, or contacting us',
        'Payment information processed securely through our payment partners',
        'Device and usage information when you visit our website or use our services',
        'Location information if you enable location services',
        'Communication preferences and marketing consent'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'Process and fulfill your orders and transactions',
        'Provide customer support and respond to your inquiries',
        'Send you important updates about your orders and account',
        'Improve our products, services, and website functionality',
        'Send marketing communications (with your consent)',
        'Prevent fraud and ensure the security of our platform'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Users,
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We may share information with trusted service providers who assist in our operations',
        'Information may be disclosed if required by law or to protect our rights',
        'Anonymous, aggregated data may be used for analytics and research purposes',
        'Business transfers may include customer information as part of the assets'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'We implement industry-standard security measures to protect your data',
        'All payment information is encrypted and processed through secure channels',
        'Regular security audits and updates to maintain protection standards',
        'Employee access to personal information is limited and monitored',
        'We use secure servers and SSL encryption for data transmission'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                  <section.icon className="h-5 w-5 text-blue-600" />
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
              Our Commitment to Your Privacy
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                At Luxe Jewelry Store, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                make a purchase, or interact with our services.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                By using our website and services, you consent to the practices described in this Privacy Policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
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
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <span>Your Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access and Correction</h4>
                  <p className="text-sm text-gray-600">
                    You have the right to access and update your personal information at any time through your account settings.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Portability</h4>
                  <p className="text-sm text-gray-600">
                    You can request a copy of your personal data in a structured, machine-readable format.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Deletion</h4>
                  <p className="text-sm text-gray-600">
                    You can request the deletion of your personal information, subject to certain legal requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing Opt-out</h4>
                  <p className="text-sm text-gray-600">
                    You can unsubscribe from marketing communications at any time using the unsubscribe link in our emails.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-orange-600" />
                </div>
                <span>Cookies and Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Required for the website to function properly, including shopping cart and checkout processes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie Management</h4>
                  <p className="text-sm text-gray-600">
                    You can control cookie settings through your browser preferences or our cookie consent tool.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <span>Contact Us About Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Privacy Questions</h4>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> privacy@luxejewelry.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Diamond District, New York, NY 10036</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h4>
                <p className="text-gray-600 mb-4">
                  For specific privacy concerns or to exercise your rights under applicable data protection laws:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> dpo@luxejewelry.com</p>
                  <p><strong>Response Time:</strong> Within 30 days</p>
                </div>
                <div className="mt-4">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">
                      Contact Privacy Team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Questions About Our Privacy Policy?
            </h3>
            <p className="text-blue-700 mb-4">
              We're here to help you understand how we protect your privacy. Don't hesitate to reach out with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Contact Us
                </Button>
              </Link>
              <Link to="/terms">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  View Terms of Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}