import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CartContext } from "../../context/CartContext";
import { useParams } from "react-router-dom";

export default function Checkout() {
  const { checkOut } = useContext(CartContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();

  const validationSchema = yup.object({
    details: yup.string().min(5).required("Address details are required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
      .required("Phone number is required"),
    city: yup.string().min(2).required("City is required"),
  });

  const formik = useFormik({
    initialValues: { details: "", phone: "", city: "" },
    validationSchema,
    onSubmit: () => handleCheckout(id, "http://localhost:5173"),
  });

  async function handleCheckout(cartId, url) {
    setIsLoading(true);
    try {
      let { data } = await checkOut(cartId, url, formik.values);
      if (data.status === "success") {
        window.location.href = data.session.url;
      } else {
        setApiError("Checkout failed. Please try again.");
      }
    } catch (error) {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">
          Checkout Now
        </h2>

        {apiError && (
          <div className="text-sm text-red-600 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-3 rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Details */}
          <div className="w-full">
            <label htmlFor="details" className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Address Details
            </label>
            <input
              id="details"
              name="details"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 outline-none"
            />
            {formik.errors.details && formik.touched.details && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formik.errors.details}</p>
            )}
          </div>

          {/* Phone */}
          <div className="w-full">
            <label htmlFor="phone" className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 outline-none"
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formik.errors.phone}</p>
            )}
          </div>

          {/* City */}
          <div className="w-full">
            <label htmlFor="city" className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 outline-none"
            />
            {formik.errors.city && formik.touched.city && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formik.errors.city}</p>
            )}
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
                Processing...
              </span>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
