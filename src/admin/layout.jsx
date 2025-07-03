'use client';

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminSidebar, AdminMobileHeader } from '../components/admin/admin-sidebar';
import { useStore } from '../lib/store';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin, redirect to admin login if not
    if (!user || user.role !== 'admin') {
      if (location.pathname !== '/admin/login') {
        navigate('/admin/login');
      }
    }
  }, [user, navigate, location.pathname]);

  // Don't render layout for login page
  if (location.pathname === '/admin/login') {
    return children;
  }

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminMobileHeader onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}