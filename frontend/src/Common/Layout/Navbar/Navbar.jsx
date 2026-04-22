import { useContext, useState } from "react";
import { ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/ProviderComp";
import { AuthContext } from "../../../Pages/Authantication/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    state: { cart, wishlist, totalItems },
  } = useContext(cartContext);

  const { user, logout } = useContext(AuthContext);

  // console.log("Navbar user:", user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-[999] bg-white border-b border-gray-100 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Ride<span className="text-blue-600">Sphere</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {["Home", "Products", "About"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}

              {user && (
                <li>
                  <Link
                    to="/orderhistory"
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    Orders
                  </Link>
                </li>
              )}

              {/* ADMIN DASHBOARD LINK (Desktop) */}
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Wishlist */}
            <Link to="/wishlist" className="relative group p-2">
              <Heart className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors" />
              {wishlist?.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group p-2">
              <ShoppingCart className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors" />
              {cart?.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200" />

            {/* User Auth */}
            {user ? (
              <div className="flex items-center gap-5">
                <span className="text-sm font-medium text-gray-700 hidden lg:block">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="sr-only">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>Log In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cart?.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 transition-colors"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-50 shadow-lg pb-4">
          <div className="px-4 pt-4 space-y-1">
            
            {/* User Mobile */}
            {user && (
              <div className="mb-4 pb-4 border-b border-gray-100 flex items-center gap-4 px-2">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {user.role === "admin" ? "Administrator" : "Customer"}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Links */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              About
            </Link>

            {user && (
              <Link
                to="/orderhistory"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                Orders
              </Link>
            )}

            {/* ADMIN DASHBOARD LINK (Mobile) */}
            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-blue-600 bg-blue-50 font-semibold rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            )}

            <div className="pt-2">
              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-500" />
                Wishlist ({wishlist?.length || 0})
              </Link>
            </div>

            <div className="pt-4 mt-2 border-t border-gray-100">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Log In
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </nav>
  );
}