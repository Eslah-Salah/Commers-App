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
                <div key={_id} className="relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
                  <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full">
                    <Link to={`/ProductDetails/${_id}/${categoryName}`} className="flex-1">
                      <div className="relative overflow-hidden">
                        <img 
                          src={imageCover} 
                          alt={title} 
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        <div className="absolute top-2 right-2">
                          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <i className="fa-solid fa-star mr-1"></i> {ratingsAverage}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{categoryName}</span>
                          <h2 className="text-lg font-semibold mt-2 text-gray-800">{title.split(" ").slice(0, 2).join(" ")}</h2>
                          <p className="text-green-600 font-bold mt-2">{price} EGP</p>
                        </div>
                      </div>
                    </Link>
                    <div className="px-4 pb-4 mt-auto">
                      <div className="flex items-center">
                        <button 
                          onClick={() => addProduct(_id)} 
                          className="bg-green-500 text-white py-2 px-4 rounded-md w-full transition duration-300 hover:bg-green-600 flex-1"
                        >
                          Add To Cart
                        </button>
                        <button
                          onClick={() => addWishlistProduct(product._id)}
                          className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                        >
                          <i
                            className={`fa-solid fa-heart text-xl ${wishlistState[product._id] ? "text-red-500" : "text-gray-400"}`}
                          ></i>
                        </button>
                      </div>
                    </div>
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