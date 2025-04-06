import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { WishlistContext } from "../../context/WishlistContext";
import { Helmet } from 'react-helmet';


export default function Wishlist() {
  const { setWishlist, getWishlistItems, removeWishlistItem } =
    useContext(WishlistContext);
  const [WishlistDetails, setWishlistDetails] = useState(null);

  async function removeItem(productId) {
    await removeWishlistItem(productId);
    await getWishlist();
    toast.success("Product Removed");
  }

  async function getWishlist() {
    let response = await getWishlistItems();
    setWishlistDetails(response?.data);
    setWishlist(response.data);
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Wishlist</title>
        </Helmet>
      <div className="container mx-auto p-4 mt-10 bg-gray-100 shadow-md rounded-lg">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          My Wishlist
        </h1>

        {/* Table - Scrollable on Small Screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max bg-white rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-gray-300">
              <tr className="text-gray-700 text-sm md:text-base">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {WishlistDetails?.data.map((product) => (
                <tr
                  key={product.id}
                  className="border-b text-sm md:text-base"
                >
                  <td className="flex items-center gap-3 p-4">
                    <img
                      src={product.imageCover}
                      className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md"
                      alt={product.title}
                    />
                    <span className="text-gray-900 font-medium">
                      {product.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-900">
                    {product.price} EGP
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeItem(product.id)}
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
      </div>
    </>
  );
}
