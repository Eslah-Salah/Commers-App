import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
export default function CartContextProvider(props) {
let [Cart,setCart]=useState(null);
  let headers = { token: localStorage.getItem("userToken") };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers: headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function clearCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function checkOut(cartId, url, formValue) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formValue },
        { headers: headers },
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function updateCartItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers: headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function getCartItems() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        { headers: headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  async function getCart() {
     let response= await getCartItems();
     setCart(response.data)
    
  }
  useEffect(() => {
    getCart();
  }, [])
  

  return (
    <CartContext.Provider
      value={{
        checkOut,
        addToCart,
        getCartItems,
        updateCartItem,
        removeCartItem,
        Cart,setCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
