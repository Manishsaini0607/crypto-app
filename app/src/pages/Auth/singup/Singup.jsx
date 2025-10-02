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
    <main className='h-screen w-full flex bg-[#F5F7FA]'>
      <div className='m-auto bg-white p-6 rounded-2xl shadow-md max-w-[450px]'>
        <h1 className='text-3xl font-medium mb-4'>Welcome to Crypto App</h1>
        <p className='text-[#797E82] text-sm mb-10'>Create a free account by filling data below.</p>

        <form onSubmit={handleSubmit}>
          <div className='flex gap-6 mb-6'>
            <div className='w-full relative'>
              <label htmlFor="name" className="text-xs text-[#171717] font-medium">Name</label>
              <input 
                type="text" 
                id='name' 
                name='name' 
                onChange={handleChange} 
                value={formData.name} 
                placeholder='James' 
                className='w-full text-sm border-gray-200 border p-2 rounded-lg' 
              />
              {errors.name && <p className='text-[10px] absolute text-red-500'>{errors.name}</p>}
            </div>
            <div className='w-full relative'>
              <label htmlFor="surname" className="text-xs text-[#171717] font-medium">Surname</label>
              <input 
                type="text" 
                id='surname' 
                name='surname' 
                onChange={handleChange} 
                value={formData.surname} 
                placeholder='Arthur' 
                className='w-full text-sm border-gray-200 border p-2 rounded-lg' 
              />
              {errors.surname && <p className='text-[10px] absolute text-red-500'>{errors.surname}</p>}
            </div>
          </div>
          
          <div className='mb-6 relative'>
            <label htmlFor="email" className='text-xs text-[#171717] font-medium'>Email</label>
            <input 
              type="text" 
              id='email' 
              name='email' 
              onChange={handleChange} 
              value={formData.email} 
              placeholder='Enter your email' 
              className='w-full text-sm border-gray-200 border p-2 rounded-lg' 
            />
            {errors.email && <p className='text-[10px] absolute text-red-500'>{errors.email}</p>}
          </div>
          
          <div className='mb-8 h-max relative'>
            <label htmlFor="password" className='text-xs text-[#171717] font-medium'>Password</label>
            <input 
            type= { showPassword ? "text" : "password" }
              id='password' 
              name='password' 
              onChange={handleChange} 
              value={formData.password} 
              placeholder='Enter your Password' 
              className='w-full text-sm border-gray-200 border p-2 rounded-lg' 
            />
            {errors.password && <p className='text-[10px] w-max h-max absolute text-red-500'>{errors.password}</p>}
             {showPassword ? <EyeOff className='cursor-pointer absolute right-2   top-1/2' onClick={()=>{setShowPassword(!showPassword)}} size={18}/> : <Eye className='cursor-pointer absolute right-2   top-1/2' onClick={()=>{setShowPassword(!showPassword)}} size={18}/>} 

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
            <label htmlFor="repeatPassword" className='text-xs text-[#171717] font-medium'>Repeat Password</label>
            <input 
              type="password" 
              id='repeatPassword' 
              name='repeatPassword' 
              onChange={handleChange} 
              value={formData.repeatPassword} 
              placeholder='Repeat your Password' 
              className='w-full text-sm border-gray-200 border p-2 rounded-lg' 
            />
            {errors.repeatPassword && <p className='text-[10px]  absolute text-red-500'>{errors.repeatPassword}</p>}
          </div>

          <div className='mb-6 flex relative items-center'>
            <input 
              type="checkbox" 
              name="terms" 
              onChange={handleChange} 
              checked={formData.terms} 
              id="terms" 
              className='mr-2 cursor-pointer' 
            />
            <label htmlFor="terms" className='text-xs text-[#171717] font-medium'>
              I agree to the <span className='text-purple-600 hover:underline cursor-pointer'>terms and conditions</span>
            </label>
            {errors.terms && <p className='text-[10px] absolute mt-6 text-red-500'>{errors.terms}</p>}
          </div>
          
          <button className='w-full mb-6 bg-purple-600 text-white p-2 rounded-lg text-sm font-medium hover:bg-purple-500 transition'>
           { loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className='text-center text-sm text-[#797E82]'>
            Already have an account? 
            <Link to="/signin" className='text-purple-600 hover:underline font-medium cursor-pointer'> Sign In</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
