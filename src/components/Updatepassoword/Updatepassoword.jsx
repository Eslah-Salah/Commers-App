import React, { useContext, useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContect";





export default function Updatepassoword() {
  let {setuserLogin}=useContext(UserContext);
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  
  let navigate = useNavigate();
  function UpdatepassowordApi(formValues) {
    setisLoading(true)
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", formValues)
      .then( (apiResponse)=> {
        if(apiResponse.data.token){
          navigate("/login");
         localStorage.setItem('userToken',apiResponse.data.token);
         setuserLogin(apiResponse.data.token);
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
   
    newPassword: yup
      .string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "newPassword must start with uppercase")
      .required("newPassword is required"),
   
  });
  let formik = useFormik({
    initialValues: {
      
      email: "",
      newPassword: "",
     
    },
    validationSchema: validationSchema,
    onSubmit: UpdatepassowordApi,
  });

  return (
    <>
      <div className="py-6 max-w-xl mx-auto text-green-600 ">
       
       {apiError? <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >{apiError}</div>:null}
        <h2 className="text-3xl font-bold mb-6">Update passoword</h2>
        <form onSubmit={formik.handleSubmit}>
         
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>
        
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your newPassword:
            </label>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
          <div className="flex items-center ">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
           {isLoading?<i className="fas fa-spider fa-spin"></i>:'Update passoword'}
          </button>
          
          </div>
          
         
         
        </form>
      </div>
    </>
  );
}
