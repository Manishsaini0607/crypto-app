import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { authApi } from '../../../api/auth';
import { useToast } from '@chakra-ui/react';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    repeatPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    repeatPassword: false
  });
  
  const toast = useToast();
  const { token } = useParams();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  // Password validation
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push('Password must be at least 6 characters long');
    if (!/(?=.*[a-z])/.test(password)) errors.push('Must contain at least one lowercase letter');
    if (!/(?=.*\d)/.test(password)) errors.push('Must contain at least one number');

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) newErrors.newPassword = passwordErrors[0];
    if (!formData.repeatPassword) {
      newErrors.repeatPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await authApi.resetPassword(token, formData.newPassword);
      setSubmitSuccess(true);
      setFormData({ newPassword: '', repeatPassword: '' });

      toast({
        title: "Password reset successful",
        description: "Redirecting to Sign In...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // ⏳ Redirect after showing success screen
      setTimeout(() => navigate('/signin'), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: 'bg-gray-200' };
    const errors = validatePassword(password);
    const strength = Math.max(0, 5 - errors.length);
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
    return { strength, label: labels[strength - 1] || 'Very Weak', color: colors[strength - 1] || 'bg-red-500' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  if (submitSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Password Reset Successful!</h3>
          <p className="text-sm text-gray-500">Redirecting you to sign in...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-4">
      <div className="w-full max-w-md m-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your new password.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.newPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => togglePasswordVisibility('newPassword')}>
                {showPassword.newPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>

            {/* Strength bar */}
            {formData.newPassword && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1">
                  <div className={`h-1 rounded-full ${passwordStrength.color}`} style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}></div>
                </div>
                <span className="text-xs text-gray-500">{passwordStrength.label}</span>
              </div>
            )}
            {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
          </div>

          {/* Repeat Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Repeat Password</label>
            <div className="relative">
              <input
                type={showPassword.repeatPassword ? 'text' : 'password'}
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.repeatPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => togglePasswordVisibility('repeatPassword')}>
                {showPassword.repeatPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>
            {errors.repeatPassword && <p className="mt-1 text-sm text-red-600">{errors.repeatPassword}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
