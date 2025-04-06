import React, { useContext, useEffect, useState } from "react";


import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContect";
import { useFormik } from "formik";






export default function forgetPassword() {
  let {setuserLogin}=useContext(UserContext);
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [formDisplay, setformDisplay] = useState(true);
  
  let navigate = useNavigate();
  function forgetPasswordApi(formValues) {
    setisLoading(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", formValues)
      .then( (apiResponse)=> {
       if(apiResponse.data.statusMsg=='success'){
        setformDisplay(false)
        
        
         setisLoading(false);
         
        }
       
       
       })
      .catch((apiResponse) => {
        setisLoading(false);
        setapiError(apiResponse?.response?.data?.message);
      });
  }
  let validationSchema = yup.object().shape({
    
    email: yup.string().email("email is invalid").required("email is required"),
   
   
   
  });
  let forgetForm = useFormik({
    initialValues: {
      
      email: "",
     
     
    },
    validationSchema: validationSchema,
    onSubmit: forgetPasswordApi,
  });
 

  function verifyResetCodeApi(formValues) {
    setisLoading(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", formValues)
      .then( (apiResponse)=> {
      if(apiResponse.data.status=="Success"){
        navigate('/updatePassword')
        
         setisLoading(false);
         
      }
        

       
      
       })
      .catch((apiResponse) => {
        setisLoading(false);
        setapiError(apiResponse?.response?.data?.message);
      });
    
  }
  let validationSchema2 = yup.object().shape({
    resetCode: yup.string().required("resetCode is required"),
  });
  let verifyResetCodeForm = useFormik({
    initialValues: {
      resetCode: "", 
    },
    validationSchema: validationSchema2,
    onSubmit: verifyResetCodeApi,
  });
  return (
    <>
    {formDisplay? <div className="py-6 max-w-xl mx-auto text-green-600 ">
        
       
        {apiError? <div
           className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
           role="alert"
         >{apiError}</div>:null}
         <h2 className="text-3xl font-bold mb-6">forget Password</h2>
         <form onSubmit={forgetForm.handleSubmit}>
          
           <div className="relative z-0 w-full mb-5 group">
             <input
               onChange={forgetForm.handleChange}
               onBlur={forgetForm.handleBlur}
               value={forgetForm.values.email}
               type="email"
               name="email"
               id="email"
               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
               placeholder=" "
             />
             <label
               htmlFor="email"
               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
             >
               Enter your Email address:
             </label>
             {forgetForm.errors.email && forgetForm.touched.email ? (
               <div
                 className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                 role="alert"
               >
                 {forgetForm.errors.email}
               </div>
             ) : null}
           </div>
         
          
           <div className="flex items-center ">
           
           <br/>
           <button
             type="submit"
             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
           >
            {isLoading?<i className="fas fa-spider fa-spin"></i>:'send'}
           </button>
           
           </div>
           
          
          
         </form>
       </div>: <div className="py-6 max-w-xl mx-auto text-green-600 ">
        
       
        {apiError? <div
           className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
           role="alert"
         >{apiError}</div>:null}
         <h2 className="text-3xl font-bold mb-6">Rest Code</h2>
         <form onSubmit={verifyResetCodeForm.handleSubmit}>
          
           <div className="relative z-0 w-full mb-5 group">
             <input
               onChange={verifyResetCodeForm.handleChange}
               onBlur={verifyResetCodeForm.handleBlur}
               value={verifyResetCodeForm.values.email}
               type="string"
               name="resetCode"
               id="resetCode"
               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
               placeholder=" "
             />
             <label
               htmlFor="resetCode"
               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
             >
               Enter your resetCode :
             </label>
             {verifyResetCodeForm.errors.resetCode && verifyResetCodeForm.touched.resetCode ? (
               <div
                 className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                 role="alert"
               >
                 {verifyResetCodeForm.errors.resetCode}
               </div>
             ) : null}
           </div>
         
          
           <div className="flex items-center ">
           
           <br/>
           <button
             type="submit"
             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
           >
            {isLoading?<i className="fas fa-spider fa-spin"></i>:'Verify Code'}
           </button>
           
           </div>
           
          
          
         </form>
       </div>}
     
     
    </>
  );
}
