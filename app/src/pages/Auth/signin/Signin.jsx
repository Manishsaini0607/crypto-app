import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signin() {
  const { login, loading } = useAuth()
  const  navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false); // 👁 state

  const validationConfig = {
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
    remember: [
      { required: true, message: 'agree to remember me' },
    ],
  }

  const validate = (formData) => {
    const errorsData = {}
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message
          return true
        }

        if (rule.minLength && value.length < 6) {
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
    if (name === "remember") {
      setFormData(prevState => ({
        ...prevState,
        [name]: !formData.remember,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Validate only this field
    validateField(name, value);
  };

  const handalSubmit = async (e) => {
    e.preventDefault();
    const validateResult = validate(formData)
    if (Object.keys(validateResult).length) return

     const success = await login(formData.email, formData.password)
     if(success){
      navigate('/')
     }

    // Clear form
    setFormData({
      email: '',
      password: '',
      remember: false
    });
  };

  return (
    <main className='min-h-screen w-full flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
      <div className='m-auto bg-white p-8 rounded-2xl shadow-xl max-w-[450px] backdrop-blur-sm bg-white/90 border border-gray-100'>
        <div className="text-center mb-8">
          <h1 className='text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text'>
            Welcome to Crypto App
          </h1>
          <p className='text-gray-600 text-sm'>Sign in to access your account</p>
        </div>

        <form onSubmit={handalSubmit}>

          {/* Email */}
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

          {/* Password with eye toggle */}
          <div className='mb-6 relative'>
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
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
            </div>
            {errors.password && (
              <p className='text-xs absolute text-red-500 mt-1 flex items-center'>
                <span className="mr-1">●</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember me + forgot */}
          <div className='mb-8 flex justify-between items-center'>
            <div className='relative'>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="remember"
                  onChange={handleChange}
                  checked={formData.remember}
                  id="remember"
                  className='w-4 h-4 border-2 border-gray-300 rounded-sm text-purple-600 focus:ring-purple-500 focus:ring-2 cursor-pointer transition-all'
                />
                <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>Remember me</span>
              </label>
              {errors.remember && (
                <p className='text-xs absolute text-red-500 mt-1 flex items-center'>
                  <span className="mr-1">●</span>
                  {errors.remember}
                </p>
              )}
            </div>
            <Link 
              to='/forgot-password' 
              className='text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors hover:underline'
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button 
            className='w-full mb-6 py-3 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-medium 
              hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-0.5 
              focus:outline-none focus:ring-4 focus:ring-purple-100 shadow-lg hover:shadow-xl'
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : 'Sign In'}
          </button>

          {/* Signup */}
          <Link to="/signup" className='block'>
            <button
              type="button"
              className='w-full py-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium 
                hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white 
                transition-all duration-300 transform hover:-translate-y-0.5 border border-gray-200 
                hover:border-transparent focus:outline-none focus:ring-4 focus:ring-purple-100'
            >
              Create New Account
            </button>
          </Link>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
       

        </form>
      </div>
    </main>
  )
}