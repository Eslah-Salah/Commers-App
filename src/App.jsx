
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import { Offline, Online } from "react-detect-offline";
import Cart from "./components/Cart/Cart";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/UserContect";

import Forgetpassoword from "./components/Forgetpassoword/Forgetpassoword";
import Updatepassoword from "./components/Updatepassoword/Updatepassoword";
import ProtectedRoute from "./context/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CartContextProvider from "./context/CartContext";
import { Toaster } from 'react-hot-toast';
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/orders/Orders";
import Categories from "./components/Categories/Categories";


import WishlistProvider from "./context/WishlistContext";
import Products from './components/Products/Products';
import Wishlist from "./components/Wishlist/wishlist";







const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },

    

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            {" "}
            <Wishlist/>{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <ProtectedRoute>
            <Checkout/>{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products/>{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders/>{" "}
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forgetPassword", element: <Forgetpassoword /> },
      { path: "updatePassword", element: <Updatepassoword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <>
     <WishlistProvider>
      <CartContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={router} />
          <Toaster/>
        </UserContextProvider>
      </QueryClientProvider>
    </CartContextProvider>
  </WishlistProvider>
  <Offline ><div className="fixed bottom-6 left-7 rounded bg-white p-3">You're offline right now. Check your connection.</div></Offline></>
 
  
  );
}

export default App;
