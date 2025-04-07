import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContect";

// Reusable Input Field Component
const InputField = ({ label, name, type, formik }) => (
  <div className="w-full">
    <label htmlFor={name} className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="w-full px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 outline-none"
    />
    {formik.errors[name] && formik.touched[name] && (
      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formik.errors[name]}</p>
    )}
  </div>
);

export default function Login() {
  const { setuserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase and be 6–11 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setApiError(error?.response?.data?.message || "Login failed");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">
          Login Now
        </h2>

        {apiError && (
          <div className="text-sm text-red-600 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-3 rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <InputField label="Email Address" name="email" type="email" formik={formik} />
          <InputField label="Password" name="password" type="password" formik={formik} />

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgetPassword"
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Forgot password?
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
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
