import React, { useContext, useState } from "react";
import axios from "axios";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Home() {
  let { addToCart, setCart } = useContext(CartContext);
  let { setWishlist, addToWishlist } = useContext(WishlistContext);
  let [page, setPage] = useState(1);
  const [wishlistState, setWishlistState] = useState({});

  const GetAllProducts = ({ queryKey }) => {
    const [, page] = queryKey;
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${page}`
    );
  };
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", page],
    queryFn: GetAllProducts,
    keepPreviousData: true,
  });

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

  return (
    <div className="mt-14 px-4">
      <Helmet>
        <title>Home</title>
      </Helmet>
      {isLoading ? (
        <div className="flex bg-gray-200 justify-center items-center h-screen w-full">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto">
          <MainSlider />
          <CategorySlider />
          {isError && (
            <h2 className="text-red-600 text-center">
              {error?.response?.data?.message || "Error loading products"}
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data?.data?.data?.map((product) => {
              let { _id, title, imageCover, price, category, ratingsAverage } = product;
              let categoryName = category?.name || "unknown-category";

              return (
                <div key={_id} className="bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105">
                  <Link to={`/ProductDetails/${_id}/${categoryName}`}>
                    <div className="mb-3">
                      <img src={imageCover} alt={title} className="w-full h-40 object-cover rounded-md" />
                    </div>
                    <h5 className="text-sm text-gray-500">{categoryName}</h5>
                    <h2 className="text-lg font-semibold">{title.split(" ").slice(0, 2).join(" ")}</h2>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-green-600 font-bold">{price} EGP</span>
                      <span className="text-yellow-500 text-sm">
                        <i className="fa-solid fa-star"></i> {ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center mt-4">
                    <button onClick={() => addProduct(_id)} className="bg-green-500 text-white py-2 px-4 rounded-md w-full transition duration-300 hover:bg-green-600">
                      Add To Cart
                    </button>
                    <i
                      onClick={() => addWishlistProduct(product._id)}
                      className={`fa-solid fa-heart text-2xl cursor-pointer ml-3 ${wishlistState[product._id] ? "text-red-500" : "text-gray-400"}`}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-5 mb-5">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 disabled:opacity-50">
              Prev
            </button>
            {new Array(data?.data?.metadata?.numberOfPages).fill("").map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 mx-1 rounded-md ${page === i + 1 ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage((prev) => Math.min(prev + 1, data?.data?.metadata?.numberOfPages))} disabled={page === data?.data?.metadata?.numberOfPages} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
