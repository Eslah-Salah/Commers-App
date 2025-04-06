import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from 'react-helmet';


export default function Cart() {
  const { setCart, getCartItems, removeCartItem, updateCartItem, clearCart } =
    useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);

  async function removeItem(productId) {
    let response = await removeCartItem(productId);
    setCartDetails(response.data);
    setCart(response.data);
    toast.success("Product Deleted");
  }

  async function getCart() {
    let response = await getCartItems();
    setCartDetails(response.data);
  }

  async function clearAllCart() {
    let response = await clearCart();
    if (response.data.message === "success") {
      setCartDetails(null);
      setCart(null);
      toast.success("Cart Cleared");
    }
  }

  async function updateQuantity(productId, count) {
    let response = await updateCartItem(productId, count);
    setCartDetails(response.data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Cart</title>
        </Helmet>
      <div className="container mx-auto p-4 mt-10 bg-gray-100 shadow-md rounded-lg">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          Shopping Cart
        </h1>

        {/* Cart Info and Clear Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 px-4">
          <h2 className="text-lg md:text-xl font-semibold text-main">
            Total Cart Price: {CartDetails?.data?.totalCartPrice} EGP
          </h2>
          <button
            onClick={clearAllCart}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0"
          >
            Clear Cart
          </button>
        </div>

        {/* Table - Scrollable on Small Screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max bg-white rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-gray-300">
              <tr className="text-gray-700 text-sm md:text-base">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {CartDetails?.data?.products?.map((product) => (
                <tr
                  key={product.product.id}
                  className="border-b text-sm md:text-base"
                >
                  <td className="flex items-center gap-3 p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md"
                      alt={product.product.title}
                    />
                    <span className="text-gray-900 font-medium">
                      {product.product.title}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          updateQuantity(product.product.id, product.count - 1)
                        }
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full"
                      >
                        −
                      </button>
                      <span className="px-3">{product.count}</span>
                      <button
                        onClick={() =>
                          updateQuantity(product.product.id, product.count + 1)
                        }
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{product.price} EGP</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeItem(product.product.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center mt-6">
          <Link to={`/checkout/${CartDetails?.cartId}`}>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg">
              Checkout Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
