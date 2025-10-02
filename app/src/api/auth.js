import { Axios } from "./axios";
 const USER_URL='/user'
export const authApi = {
   
 async login(email, password) {
   try {
     const res = await Axios.post(`${USER_URL}/signin`, { email, password });
     console.log("raw login response →", res);   // <-- add this
     // res MUST be an object with a .data key
     return res?.data;                           // safe return for now
   } catch (error) {
       throw error.response.data.message
   }                        // safe return for now
  },


  async signup(firstName, lastName, email, password) {
   try {
     const res = await Axios.post(`${USER_URL}/signup`, {firstName,lastName,email,password });
     return res?.data;
   } catch (error) {
       throw error.response.data.message
   }                        // safe return for now
  },


   async emailVarify(email){
  
   try {
      const res = await Axios.post(`${USER_URL}/send-verification-mail`, { email });
      return res?.data;

   } catch (error) {
    throw error.response.data.message

   }
   },

    async verifyUser(token){
      try {
        const res = await Axios.post(`${USER_URL}/verfiy-user-mail`, { token });
        return res?.data;
      } catch (error) {
        throw error.response.data.message
      }
    } ,

  // ✅ implement forgot password function

  async forgetPassword(email){
    try {
      const res = await Axios.post(`${USER_URL}/forgot-password`, { email });
      return res?.data;
  } catch (error) {
    throw error.response.data.message
  }
}
,

async resetPassword(token, password){
  try {
    const res = await Axios.post(`${USER_URL}/verify-forgot-mail`, { token, password });
    return res?.data;
} catch (error) {
  throw error.response.data.message
}
  }


};