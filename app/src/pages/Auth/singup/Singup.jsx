import { use } from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react'; 

export default function Signup() {
  const {signup , loading} = useAuth()
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false);
   

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({})

  const validationConfig = {
    name: [
      { required: true, message: 'Please enter your name' },
      { minLength: 2, message: 'Name should be at least 2 characters long' },
    ],
    surname: [
      { required: true, message: 'Please enter your surname' },
      { minLength: 2, message: 'Surname should be at least 2 characters long' },
    ],
    email: [
      { required: true, message: 'Please enter an email' },
      {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: 'Please enter a valid email',
      },
    ],
    password: [
      { required: true, message: 'Please enter a password' },
      { minLength: 6, message: 'Password should be at least 6 characters long' },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 
        message: 'Password must contain at least one letter and one number',
      }
    ],
    repeatPassword: [
      { required: true, message: 'Please repeat your password' },
      {
        validate: (value) => value === formData.password,
        message: 'Passwords do not match',
      },
    ],  
    terms: [
      { required: true, message: 'You must agree to the terms and conditions' },
    ],
  }

  // Add the missing validatePassword function
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
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

  const validate = (formData) => {
    const errorsData = {}
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message
          return true
        }

        if (rule.minLength && value.length < rule.minLength) { // Fixed: was hardcoded to 5
          errorsData[key] = rule.message
          return true
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message
          return true
        }
        if (rule.validate && !rule.validate(value)) {
          errorsData[key] = rule.message
          return true
        }
      })
    })

    setErrors(errorsData)
    return errorsData
  }

  const validateField = (fieldName, fieldValue) => {
    const rules = validationConfig[fieldName];
    let error = "";

    for (let rule of rules) {
      if (rule.required && !fieldValue) {
        error = rule.message;
        break;
      }

      if (rule.minLength && fieldValue.length < rule.minLength) {
        error = rule.message;
        break;
      }

      if (rule.pattern && !rule.pattern.test(fieldValue)) {
        error = rule.message;
        break;
      }

      if (rule.validate && !rule.validate(fieldValue)) {
        error = rule.message;
        break;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "terms") {
      setFormData(prevState => ({
        ...prevState,
        [name]: !formData.terms,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Validate only this field
    validateField(name, name === "terms" ? !formData.terms : value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validateResult = validate(formData);
  if (Object.keys(validateResult).length) return;

  try {
    await signup(formData.name, formData.surname, formData.email, formData.password);
    setFormData({
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: '',
      terms: false
    });
    navigate("/register-email", { state: { email: formData.email } });
  } catch (error) {
    console.log(error);
  }
};


  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: 'bg-gray-200' };
    
    const passwordErrors = validatePassword(password);
    const strength = Math.max(0, 5 - passwordErrors.length);
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
    
    return {
      strength,
      label: labels[strength - 1] || 'Very Weak',
      color: colors[strength - 1] || 'bg-red-500'
    };
  };

  // Fixed: Use formData.password instead of formData.newPassword
  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <main className='min-h-screen w-full flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4'>
      <div className='m-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-[500px] relative border border-gray-100'>
        <div className="text-center mb-8">
          <h1 className='text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text'>
            Create Your Account
          </h1>
          <p className='text-gray-600 text-sm'>Join the future of crypto trading</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col sm:flex-row gap-6 mb-6'>
            <div className='w-full relative'>
              <label htmlFor="name" className="text-sm text-gray-700 font-medium block mb-2">Name</label>
              <div className="relative group">
                <input 
                  type="text" 
                  id='name' 
                  name='name' 
                  onChange={handleChange} 
                  value={formData.name} 
                  placeholder='James' 
                  className='w-full text-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-purple-100 focus:ring-4 transition-all outline-none' 
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
              {errors.name && (
                <p className='text-xs absolute text-red-500 mt-1 flex items-center'>
                  <span className="mr-1">●</span>
                  {errors.name}
                </p>
              )}
            </div>
            <div className='w-full relative'>
              <label htmlFor="surname" className="text-sm text-gray-700 font-medium block mb-2">Surname</label>
              <div className="relative group">
                <input 
                  type="text" 
                  id='surname' 
                  name='surname' 
                  onChange={handleChange} 
                  value={formData.surname} 
                  placeholder='Arthur' 
                  className='w-full text-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-purple-100 focus:ring-4 transition-all outline-none' 
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
              {errors.surname && (
                <p className='text-xs absolute text-red-500 mt-1 flex items-center'>
                  <span className="mr-1">●</span>
                  {errors.surname}
                </p>
              )}
            </div>
          </div>
          
          <div className='mb-6 relative'>
            <label htmlFor="email" className='text-sm text-gray-700 font-medium block mb-2'>Email</label>
            <div className="relative group">
              <input 
                type="text" 
                id='email' 
                name='email' 
                onChange={handleChange} 
                value={formData.email} 
                placeholder='Enter your email' 
                className='w-full text-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-purple-100 focus:ring-4 transition-all outline-none' 
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
            </div>
            {errors.email && (
              <p className='text-xs absolute text-red-500 mt-1 flex items-center'>
                <span className="mr-1">●</span>
                {errors.email}
              </p>
            )}
          </div>
          
          <div className='mb-8 relative'>
            <label htmlFor="password" className='text-sm text-gray-700 font-medium block mb-2'>Password</label>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"}
                id='password' 
                name='password' 
                onChange={handleChange} 
                value={formData.password} 
                placeholder='Enter your Password' 
                className='w-full text-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-purple-100 focus:ring-4 transition-all outline-none pr-12' 
              />
              <button 
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
            </div>
            {errors.password && (
              <p className='text-xs absolute text-red-500 mt-1 flex items-center'>
                <span className="mr-1">●</span>
                {errors.password}
              </p>
            )}

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="m-3 absolute w-full">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 min-w-[60px]">{passwordStrength.label}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className='mb-6 relative'>
            <label htmlFor="repeatPassword" className='text-sm text-gray-700 font-medium block mb-2'>Repeat Password</label>
            <div className="relative group">
              <input 
                type="password" 
                id='repeatPassword' 
                name='repeatPassword' 
                onChange={handleChange} 
                value={formData.repeatPassword} 
                placeholder='Repeat your Password' 
                className='w-full text-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-purple-100 focus:ring-4 transition-all outline-none' 
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
            </div>
            {errors.repeatPassword && (
              <p className='text-xs absolute text-red-500 mt-1 flex items-center'>
                <span className="mr-1">●</span>
                {errors.repeatPassword}
              </p>
            )}
          </div>

          <div className='mb-8 relative'>
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                name="terms" 
                onChange={handleChange} 
                checked={formData.terms} 
                id="terms" 
                className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-purple-500 text-purple-600 cursor-pointer transition-colors' 
              />
              <label htmlFor="terms" className='text-sm text-gray-700'>
                I agree to the <span className='text-purple-600 hover:text-purple-700 transition-colors font-medium cursor-pointer'>terms and conditions</span>
              </label>
            </div>
            {errors.terms && (
              <p className='text-xs text-red-500 mt-1 flex items-center'>
                <span className="mr-1">●</span>
                {errors.terms}
              </p>
            )}
          </div>
          
          <button 
            className='w-full py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-purple-100 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mb-6'
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
          
          <p className='text-center text-sm text-gray-600'>
            Already have an account?
            <Link to="/signin" className='ml-1 text-purple-600 font-medium hover:text-purple-700 transition-colors'>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
