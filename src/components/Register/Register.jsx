import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContect";

export default function Register() {
  const { setuserLogin } = useContext(UserContext);
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (formValues) => {
    setisLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        formValues
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setuserLogin(data.token);
        navigate("/");
      }
    } catch (err) {
      setapiError(err?.response?.data?.message || "Registration failed");
    } finally {
      setisLoading(false);
    }
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Minimum 3 characters")
      .max(10, "Maximum 10 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
    password: yup
      .string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Must start with uppercase, 6-11 chars")
      .required("Password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  const renderInput = (name, type = "text", labelText) => (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
      >
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 outline-none"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen mt-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">
          Register Now
        </h2>

        {apiError && (
          <div className="text-sm text-red-600 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-3 rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {renderInput("name", "text", "Enter your name")}
          {renderInput("email", "email", "Enter your email")}
          {renderInput("phone", "tel", "Enter your phone")}
          {renderInput("password", "password", "Enter your password")}
          {renderInput("rePassword", "password", "Confirm your password")}

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/login"
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Already have an account? Login
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-400 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4zm2 5.3A7.9 7.9 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
