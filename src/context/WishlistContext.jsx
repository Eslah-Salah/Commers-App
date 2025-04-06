import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let WishlistContext = createContext();
export default function WishlistProvider(props) {
let [Wishlist,setWishlist]=useState(null);
  let headers = { token: localStorage.getItem("userToken") };

  function addToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers: headers }
      )
      
      .then((response) => response)
      .catch((err) => err);
  }
  function removeWishlistItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }

 
 
  function getWishlistItems() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,

        { headers: headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  async function getWishlist() {
     let response= await getWishlistItems();
     setWishlist(response.data)
    
  }
  useEffect(() => {
    getWishlist();
  }, [])
  

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        getWishlistItems,
        removeWishlistItem,
        Wishlist,
        setWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
