import React, { useContext, useState, useCallback } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../context/CartContext";
import { useParams } from "react-router-dom";

// Reusable Input component
const FormInput = ({ label, name, type, formik }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="text-sm text-gray-600 dark:text-gray-300">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
    />
  </div>
);

export default function Checkout() {
  const { checkOut } = useContext(CartContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleCheckout = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        const { data } = await checkOut(id, "http://localhost:5173", values);
        if (data.status === "success") {
          window.location.href = data.session.url;
        } else {
          setApiError("Checkout failed. Please try again.");
        }
      } catch (error) {
        setApiError("Something went wrong. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [checkOut, id]
  );

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleCheckout,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 text-center">
          Checkout Now
        </h2>

        {apiError && (
          <div className="text-sm text-red-600 bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700 p-3 rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput label="Delivery Address" name="details" type="text" formik={formik} />
          <FormInput label="Phone Number" name="phone" type="tel" formik={formik} />
          <FormInput label="City" name="city" type="text" formik={formik} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition duration-200 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4zm2 5.3A7.9 7.9 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
