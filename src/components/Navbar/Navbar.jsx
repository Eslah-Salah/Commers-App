import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/freshcart-logo.svg';
import { UserContext } from './../../context/UserContect';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { Cart } = useContext(CartContext);
  let navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login');
  }

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-[1000] border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoImg} className="h-10" alt="FreshCart Logo" />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white shadow-lg lg:shadow-none transition-transform ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>          
          {userLogin && (
            <ul className="flex flex-col lg:flex-row lg:space-x-6 text-center lg:text-left">
              <li><NavLink to="/" className={({ isActive }) => isActive ? "text-green-600" : ""}>Home</NavLink></li>
              <li><NavLink to="/cart" className={({ isActive }) => isActive ? "text-green-600" : ""}>Cart</NavLink></li>
              <li><NavLink to="/wishlist" className={({ isActive }) => isActive ? "text-green-600" : ""}>Wish list</NavLink></li>
              <li><NavLink to="/brands" className={({ isActive }) => isActive ? "text-green-600" : ""}>Brands</NavLink></li>
              <li><NavLink to="/categories" className={({ isActive }) => isActive ? "text-green-600" : ""}>Categories</NavLink></li>
              <li><NavLink to="/products" className={({ isActive }) => isActive ? "text-green-600" : ""}>Products</NavLink></li>
            </ul>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Social Media Links */}
          <div className="hidden lg:flex space-x-4 text-gray-600">
            <a href="https://www.facebook.com" target="_blank"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank"><i className="fa-brands fa-twitter"></i></a>
            <a href="https://linkedin.com" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i></a>
          </div>
          
          {/* Cart & Auth Buttons */}
          <ul className="flex items-center space-x-4">
            {userLogin ? (
              <>
                <li className="relative">
                  <NavLink to="/cart" className="relative">
                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                    {Cart?.numOfCartItems > 0 && (
                      <span className="bg-green-600 text-white p-1 text-xs absolute -top-2 -right-2 rounded-full">
                        {Cart.numOfCartItems}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <button onClick={logout} className="cursor-pointer text-green-600">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
