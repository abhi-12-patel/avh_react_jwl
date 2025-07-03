'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Check, X, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useStore } from '../../lib/store';

export default function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        navigate('/account');
      }, 2000);
    }, 1500);
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Weak', color: 'text-red-600', bgColor: 'bg-red-500' };
      case 2:
        return { text: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-500' };
      case 3:
        return { text: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-500' };
      case 4:
        return { text: 'Strong', color: 'text-green-600', bgColor: 'bg-green-500' };
      default:
        return { text: '', color: '', bgColor: '' };
    }
  };

  const strength = passwordStrength(formData.newPassword);
  const strengthInfo = getPasswordStrengthText(strength);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to change your password.</p>
          <Link to="/login">
            <Button className="luxury-gradient text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                Password Changed Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your password has been updated. You'll be redirected to your account page shortly.
              </p>
              <Link to="/account">
                <Button className="w-full luxury-gradient text-white">
                  Go to Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/account" className="inline-flex items-center text-sm text-gray-600 hover:text-gold-600 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Account
          </Link>
          <h2 className="font-playfair text-3xl font-bold text-gray-900">
            Change Password
          </h2>
          <p className="mt-2 text-gray-600">
            Update your password to keep your account secure
          </p>
        </div>

        {/* Change Password Form */}
        <Card>
          <CardHeader>
            <CardTitle>Update Your Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.currentPassword ? 'border-red-300' : ''}`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.newPassword ? 'border-red-300' : ''}`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.bgColor}`}
                          style={{ width: `${(strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs ${strengthInfo.color}`}>
                        {strengthInfo.text}
                      </span>
                    </div>
                  </div>
                )}
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                  <div className="mt-1 flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm">Passwords match</span>
                  </div>
                )}
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center">
                    {formData.newPassword.length >= 6 ? 
                      <Check className="h-3 w-3 text-green-500 mr-2" /> : 
                      <X className="h-3 w-3 text-gray-400 mr-2" />
                    }
                    At least 6 characters
                  </li>
                  <li className="flex items-center">
                    {/[A-Z]/.test(formData.newPassword) ? 
                      <Check className="h-3 w-3 text-green-500 mr-2" /> : 
                      <X className="h-3 w-3 text-gray-400 mr-2" />
                    }
                    One uppercase letter
                  </li>
                  <li className="flex items-center">
                    {/[0-9]/.test(formData.newPassword) ? 
                      <Check className="h-3 w-3 text-green-500 mr-2" /> : 
                      <X className="h-3 w-3 text-gray-400 mr-2" />
                    }
                    One number
                  </li>
                  <li className="flex items-center">
                    {/[^A-Za-z0-9]/.test(formData.newPassword) ? 
                      <Check className="h-3 w-3 text-green-500 mr-2" /> : 
                      <X className="h-3 w-3 text-gray-400 mr-2" />
                    }
                    One special character
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full luxury-gradient text-white py-3"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Password...
                  </div>
                ) : (
                  'Update Password'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}