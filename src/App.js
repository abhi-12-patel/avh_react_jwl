import React from "react";
import "./index.css";
// import "@radix-ui/themes/styles.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Cart from "./pages/cart/cart";
import ChangePassword from "./pages/change-password/changePassword";
import Checkout from "./pages/checkout/checkout";
import Contact from "./pages/contact/contact";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import OrderConfirmation from "./pages/order-confirmation/OrderConfirmation";
import PrivacyPolicy from "./pages/privacy/privacy-policy";
import Profile from "./pages/profile/profile";
import TrackOrderPage from "./pages/track-order/page";
import ForgotPassword from "./pages/forgot-password/forgotPassword";
import TermsOfService from "./pages/terms/terms-service";
import Wishlist from "./pages/wishlist/wishlist";
// import Orders from "./pages/orders/orders";
import Home from "./pages/home/home";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import ProductsPage from "./pages/products/products";
import ProductDetailPage from "./pages/products/product-detail";
import ProductReviewsPage from "./pages/products/product-reviews";
import AdminDashboard from "./admin/dashboard";
import AdminLayout from "./admin/layout";
import AdminAnalytics from "./admin/analytics/analytics";
import AdminCategoriesPage from "./admin/categories/categories";
import AdminCustomersPage from "./admin/customers/costomers";
import AdminLoginPage from "./admin/login/login";
import AdminProductsPage from "./admin/products/products";
import AdminInventoryPage from "./admin/inventory/inventory";
import AdminReportsPage from "./admin/reports/reports";
import AdminSettingsPage from "./admin/settings/settings";
import AdminReviewsPage from "./admin/reviews/reviews";
import AdminMarketingPage from "./admin/marketing/marketing";
import AdminNotificationsPage from "./admin/notifications/notifications";
import AdminHelpPage from "./admin/help/help";

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        {/* <Route path="/orders" element={<Orders />} /> */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* Product routes */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/:id/reviews" element={<ProductReviewsPage />} />
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProductsPage />} />
                {/* <Route path="orders" element={<AdminOrdersPage />} /> */}
                <Route path="login" element={<AdminLoginPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="customers" element={<AdminCustomersPage />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="inventory" element={<AdminInventoryPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                {/* <Route path="payments" element={<AdminPaymentsPage />} /> */}
                <Route path="reviews" element={<AdminReviewsPage />} />
                <Route path="marketing" element={<AdminMarketingPage />} />
                <Route path="notifications" element={<AdminNotificationsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="help" element={<AdminHelpPage />} />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
