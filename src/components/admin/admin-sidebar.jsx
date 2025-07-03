import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Gem,
  FileText,
  CreditCard,
  UserCheck,
  TrendingUp,
  Bell,
  HelpCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useStore } from '../../lib/store';


const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    badge: null
  },
  {
    title: 'Categories',
    icon: Package,
    href: '/admin/categories',
    badge: null
  },
  {
    title: 'Products',
    icon: Package,
    href: '/admin/products',
    badge: null
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    href: '/admin/orders',
    badge: '12'
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/admin/customers',
    badge: null
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
    badge: null
  },
  {
    title: 'Inventory',
    icon: Gem,
    href: '/admin/inventory',
    badge: null
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/admin/reports',
    badge: null
  },
  {
    title: 'Payments',
    icon: CreditCard,
    href: '/admin/payments',
    badge: null
  },
  {
    title: 'Reviews',
    icon: UserCheck,
    href: '/admin/reviews',
    badge: '3'
  },
  {
    title: 'Marketing',
    icon: TrendingUp,
    href: '/admin/marketing',
    badge: null
  },
  {
    title: 'Notifications',
    icon: Bell,
    href: '/admin/notifications',
    badge: '5'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
    badge: null
  },
  {
    title: 'Help & Support',
    icon: HelpCircle,
    href: '/admin/help',
    badge: null
  }
];

export function AdminSidebar({ isOpen, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full luxury-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <h2 className="font-playfair text-xl font-bold">Luxe Admin</h2>
              <p className="text-xs text-gray-400">Management Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-gold-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
}

export function AdminMobileHeader({ onToggle }) {
  return (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-gray-600 hover:text-gray-900"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full luxury-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xs">L</span>
          </div>
          <span className="font-playfair text-lg font-bold text-gray-900">Luxe Admin</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>
      </div>
    </div>
  );
}