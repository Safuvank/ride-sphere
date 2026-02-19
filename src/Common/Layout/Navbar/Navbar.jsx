
import { useContext, useState } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/ProviderComp";
import { AuthContext } from "../../../Pages/Authantication/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    state: { cart, wishlist },
  } = useContext(cartContext);

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed w-full bg-gray-800 shadow-sm py-4 px-[7%] flex items-center justify-between z-[999]">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-[#eff0f3] cursor-pointer">
          <Link to="/">RideSphere</Link>
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="flex items-center space-x-5 text-[#eff0f3]">
        <ul className="hidden md:flex space-x-8 text-[#eff0f3] font-medium">
          <li className="hover:text-red-500 font-semibold cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/products">Products</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
           
           
            {user ? (
          <div className="flex items-center space-x-3">
            <li className="hover:text-red-500 cursor-pointer">
            <Link to="/orderhistory">Your Orders</Link>
          </li>
          </div>
        ) : (
          <div></div>
        )}
          </li>
        </ul>

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-red-500" />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Wishlist Icon */}
        <div className="relative">
          <Link to="/wishlist">
            <Heart className="w-5 h-5 cursor-pointer hover:text-red-500" />
            {wishlist?.length > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>

        {/* User/Login / Logout */}

        {user ? (
          <div className="flex items-center space-x-3">
            <span className="hidden md:inline">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white px-3 py-1 rounded text-gray-800 flex items-center"
          >
            <User className="w-4 h-4 mr-1" /> Login
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#eff0f3] hover:text-red-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col items-center space-y-4 py-5 text-gray-700 font-medium">
            <li className="text-red-500 font-semibold cursor-pointer">
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="hover:text-red-500 cursor-pointer">
              <Link to="/products" onClick={() => setIsOpen(false)}>
                Products
              </Link>
            </li>
            <li className="hover:text-red-500 cursor-pointer">
              <Link to="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            {user ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
