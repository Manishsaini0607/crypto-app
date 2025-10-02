import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext';



export default function Signin() {
 const {login , loading} = useAuth()
 




  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({})

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
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: 'Password must contain at least one letter and one number',

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


  const handalSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(formData)
    if (Object.keys(validateResult).length) return
    
      
      login(formData.email, formData.password)
      
    
    // Clear form 

    setFormData({
      email: '',
      password: '',
      remember: false
    });
    
  };



  return (
    <main className='h-screen w-full flex bg-[#F5F7FA] '>
      <div className='m-auto  bg-white p-6 rounded-2xl shadow-md max-w-[450px] '>
        <h1 className='text-3xl font-medium mb-4 '>Welcome to Crypto App</h1>
        <p className='text-[#797E82] text-sm mb-10'>Create a free account by filling data below.</p>

        <form onSubmit={handalSubmit}>
        
          <div className='mb-6 relative'>
            <label htmlFor="email" className='text-xs text-[#171717] font-medium '>Email</label>
            <input type="text" id='email' name='email' onChange={(e) => handleChange(e,)} value={formData.email} placeholder='Enter your email' className='w-full text-sm border-gray-200 border p-2 rounded-lg' />
            {errors.email && <p className='text-[10px] absolute text-red-500 '>{errors.email}</p>}
          </div>
          <div className='mb-6'>
            <label htmlFor="password" className='text-xs text-[#171717] font-medium '>Password</label>
            <input type="password" id='password' name='password' onChange={(e) => handleChange(e,)} value={formData.password} placeholder='Enter your Password' className='w-full text-sm border-gray-200 border p-2 rounded-lg' />
            {errors.password && <p className='text-[10px] absolute text-red-500 '>{errors.password}</p>}
          </div>
         

          <div className='mb-6 flex justify-between  items-center'>
           <div className=' relative w-[70%]'> <input type="checkbox" name="remember" onChange={(e) => handleChange(e)} checked={formData.remember} id="remember" className='mr-2 cursor-pointer' />
            <label htmlFor="remember" className='text-xs text-[#171717] font-medium '>Remember me</label>
            {errors.remember && <p className='text-[10px] absolute  text-red-500 '>{errors.remember}</p>}</div>
            <Link  to ='/forgot-password' className='text-xs hover:underline cursor-pointer text-purple-500 ' >Forgot Password? </Link>

          </div>
          <button className='w-full mb-6   p-2 text-white rounded-lg bg-purple-600 text-sm font-medium hover:bg-purple-500 transition'>{loading ? 'Loading...' : 'Sign In'}</button>
          <Link to="/signup" className=''>
           <button className='w-full mb-6 bg-[#D8DDE2] text-gray-500 p-2 hover:text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition'>Create New Account</button>
          </Link>

        </form>


      </div>
    </main>
  )
}
