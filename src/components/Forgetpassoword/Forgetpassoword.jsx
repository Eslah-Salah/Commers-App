import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContect";
import { useFormik } from "formik";

export default function ForgetPassword() {
  let { setuserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formDisplay, setFormDisplay] = useState(true);
  const navigate = useNavigate();

  function forgetPasswordApi(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", formValues)
      .then((res) => {
        if (res.data.statusMsg === "success") {
          setFormDisplay(false);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setApiError(err?.response?.data?.message);
      });
  }

  function verifyResetCodeApi(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", formValues)
      .then((res) => {
        if (res.data.status === "Success") {
          navigate("/updatePassword");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setApiError(err?.response?.data?.message);
      });
  }

  const forgetForm = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: forgetPasswordApi,
  });

  const verifyResetCodeForm = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: yup.object({
      resetCode: yup.string().required("Reset code is required"),
    }),
    onSubmit: verifyResetCodeApi,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl w-full max-w-md p-6 sm:p-8">
        {apiError && (
          <div className="mb-4 text-sm text-red-800 bg-red-100 p-3 rounded dark:bg-red-700 dark:text-white">
            {apiError}
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6">
          {formDisplay ? "Forgot Password" : "Enter Reset Code"}
        </h2>

        <form
          onSubmit={
            formDisplay ? forgetForm.handleSubmit : verifyResetCodeForm.handleSubmit
          }
        >
          <div className="mb-5">
            <label
              htmlFor={formDisplay ? "email" : "resetCode"}
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {formDisplay ? "Email Address" : "Reset Code"}
            </label>
            <input
              type={formDisplay ? "email" : "text"}
              id={formDisplay ? "email" : "resetCode"}
              name={formDisplay ? "email" : "resetCode"}
              value={
                formDisplay
                  ? forgetForm.values.email
                  : verifyResetCodeForm.values.resetCode
              }
              onChange={
                formDisplay
                  ? forgetForm.handleChange
                  : verifyResetCodeForm.handleChange
              }
              onBlur={
                formDisplay
                  ? forgetForm.handleBlur
                  : verifyResetCodeForm.handleBlur
              }
              className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder={formDisplay ? "Enter your email" : "Enter reset code"}
            />
            {formDisplay ? (
              forgetForm.touched.email && forgetForm.errors.email ? (
                <p className="mt-2 text-sm text-red-600">
                  {forgetForm.errors.email}
                </p>
              ) : null
            ) : verifyResetCodeForm.touched.resetCode &&
              verifyResetCodeForm.errors.resetCode ? (
              <p className="mt-2 text-sm text-red-600">
                {verifyResetCodeForm.errors.resetCode}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <i className="fas fa-spinner fa-spin"></i> Loading...
              </span>
            ) : formDisplay ? (
              "Send Reset Code"
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
