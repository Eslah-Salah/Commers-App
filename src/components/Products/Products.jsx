import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishlistContext } from "../../context/WishlistContext";
import { Helmet } from "react-helmet";

export default function Products() {
  let { addToCart, setCart } = useContext(CartContext);
  let { setWishlist, addToWishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistState, setWishlistState] = useState({});

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      setCart(response.data);
      toast.success("Product added successfully to your cart", {
        duration: 3000,
        position: "bottom-left",
      });
    } else {
      toast.error("Error adding product. Please try again.", {
        duration: 3000,
        position: "bottom-left",
      });
    }
  }

  async function addWishlistProduct(productId) {
    let response = await addToWishlist(productId);
    if (response.data.status === "success") {
      setWishlist(response.data);
      setWishlistState((prev) => ({ ...prev, [productId]: true }));
      toast.success("Added to wishlist!", {
        duration: 3000,
        position: "bottom-left",
      });
    } else {
      toast.error("Error adding to wishlist. Try again.", {
        duration: 3000,
        position: "bottom-left",
      });
    }
  }

  const GetAllProducts = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  };

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["product"],
    queryFn: GetAllProducts,
    keepPreviousData: true,
  });

  const filteredProducts = data?.data?.data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="mt-14 px-4">
        <Helmet>
          <title>Products</title>
        </Helmet>

        {isLoading ? (
          <div className="flex bg-gray-200 justify-center items-center h-screen w-full">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto">
            {/* Search Input */}
            <form className="max-w-md mx-auto mb-5">
              <input
                type="search"
                id="default-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Search products..."
                required
              />
            </form>

            <Toaster />

            {isError && (
              <h2 className="text-red-600 text-center">
                {error?.response?.data?.message || "Error loading products"}
              </h2>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredProducts.map((product) => {
                let { _id, title, imageCover, price, category, ratingsAverage } =
                  product;
                let categoryName = category?.name || "unknown-category";

                return (
                  <div
                    key={_id}
                    className="bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105"
                  >
                    <Link to={`/ProductDetails/${_id}/${categoryName}`}>
                      <div className="mb-3">
                        <img
                          src={imageCover}
                          alt={title}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </div>
                      <h5 className="text-sm text-gray-500">{categoryName}</h5>
                      <h2 className="text-lg font-semibold">
                        {title.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-green-600 font-bold">
                          {price} EGP
                        </span>
                        <span className="text-yellow-500 text-sm">
                          <i className="fa-solid fa-star"></i> {ratingsAverage}
                        </span>
                      </div>
                    </Link>

                    {/* Wishlist & Add to Cart */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => addProduct(_id)}
                        className="bg-green-500 text-white py-2 px-4 rounded-md w-full transition duration-300 hover:bg-green-600"
                      >
                        Add To Cart
                      </button>
                      <i
                        onClick={() => addWishlistProduct(product._id)}
                        className={`fa-solid fa-heart text-2xl cursor-pointer ml-3 ${
                          wishlistState[product._id]
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
