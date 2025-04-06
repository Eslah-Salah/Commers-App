import React, { useContext, useEffect, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContect";





export default function Login() {
  let {setuserLogin}=useContext(UserContext);
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  
  let navigate = useNavigate();
  function handleLogin(formValues) {
    setisLoading(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then( (apiResponse)=> {
        if(apiResponse.data.message==='success'){
          navigate("/");
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
   
    password: yup
      .string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase")
      .required("password is required"),
   
  });
  let formik = useFormik({
    initialValues: {
      
      email: "",
      password: "",
     
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="py-6 max-w-xl mx-auto text-green-600 mt-8 ">
       
       {apiError? <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >{apiError}</div>:null}
        <h2 className="text-3xl font-bold mb-6">Login Now</h2>
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
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password:
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex items-center ">
            <Link to="/forgetPassword">Forget Password?</Link>
          <br/>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
           {isLoading?<i className="fas fa-spider fa-spin"></i>:'Login'}
          </button>
          
          </div>
          
         
         
        </form>
      </div>
    </>
  );
}
