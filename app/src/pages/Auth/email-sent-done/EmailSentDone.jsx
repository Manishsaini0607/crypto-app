import React from 'react'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'

export default function EmailSentDone() {
  const location = useLocation();
  const email = location.state?.email;

  return (
   <main className='flex h-screen w-full bg-[#F5F7FA]' >  
       <div className=' text-center m-auto p-8 rounded-2xl bg-white shadow-md max-w-[450px] '>
           <IoMdCheckmarkCircle className="text-4xl mx-auto text-green-500" />
           <h2 className="mt-5 text-xl font-medium text-gray-800"  >Email Sent Successfully</h2>
           <p className="text-xs text-[#797E82]  ">We have sent instructions on how to reset your password to <span className='font-medium text-sm'>{email}</span>. Please follow the instructions from the email.</p>
            

       </div>
   
       </main>
  )
}
