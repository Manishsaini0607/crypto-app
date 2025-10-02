import React, { useState } from 'react';
import { MdAnimation } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    repeatPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    repeatPassword: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  // Password validation rules
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors = {};
    
    // Validate new password
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      newErrors.newPassword = passwordErrors[0]; // Show first error
    }
    
    // Validate password confirmation
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({ newPassword: '', repeatPassword: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (error) {
      setErrors({ submit: 'Failed to reset password. Please try again.' });
    } finally {
    //    navigate('/signin');
        setIsSubmitting(false);
         setTimeout(() => navigate('/signin'), 2000);

    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    const errors = validatePassword(password);
    const strength = Math.max(0, 5 - errors.length);
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
    
    return {
      strength,
      label: labels[strength - 1] || 'Very Weak',
      color: colors[strength - 1] || 'bg-red-500'
    };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  if (submitSuccess) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
                <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Password Reset Successful!</h3>
          <p className="text-sm text-gray-500">Your password has been updated successfully.</p>
        </div>
      </div>
            </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-4">
         <div className="w-full max-w-md m-auto bg-white rounded-2xl shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-sm text-gray-600">Enter your new password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* New Password Field */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.newPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.newPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="••••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('newPassword')}
            >
             
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{passwordStrength.label}</span>
              </div>
            </div>
          )}
          
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        {/* Repeat Password Field */}
        <div>
          <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Repeat New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.repeatPassword ? 'text' : 'password'}
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.repeatPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="••••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('repeatPassword')}
            >
            
            </button>
          </div>
          {errors.repeatPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.repeatPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.newPassword || !formData.repeatPassword}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Resetting...
            </div>
          ) : (
            'Reset Password'
          )}
        </button>

        {/* General Error Message */}
        {errors.submit && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{errors.submit}</p>
          </div>
        )}
      </form>


    </div>
    </main>
  );
};

export default ResetPassword;
