// import { useContext, useState } from "react";
// import { ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { cartContext } from "../../Context/ProviderComp";
// import { AuthContext } from "../../../Pages/Authantication/AuthContext";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const {
//     state: { cart, wishlist },
//   } = useContext(cartContext);

//   const { user, logout } = useContext(AuthContext);

//   console.log("Navbar user:", user);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     // THEME: Dark background with a "Volt Green" bottom border strip
//     <nav className="fixed top-0 w-full z-[999] bg-zinc-950 border-b-4 border-lime-500 shadow-2xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo - Italicized and Bold for "Speed" look */}
//           <div className="flex-shrink-0 cursor-pointer group">
//             <Link to="/" className="flex items-center gap-1">
//               {/* Slanted Container */}
//               <div className="h-8 px-3 bg-lime-500 -skew-x-12 flex items-center justify-center transform group-hover:skew-x-0 transition-transform duration-300">
//                 <span className="text-zinc-950 font-black text-xl italic skew-x-12">
//                   R
//                 </span>
//               </div>
//               <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase ml-1 group-hover:text-lime-400 transition-colors">
//                 Ride<span className="text-lime-500">Sphere</span>
//               </h1>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <ul className="flex space-x-8">
//               {["Home", "Products", "About"].map((item, index) => (
//                 <li key={index}>
//                   <Link
//                     to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
//                     className="relative text-zinc-400 hover:text-white font-bold italic uppercase tracking-widest text-sm transition-all duration-300 group"
//                   >
//                     {item}
//                     {/* Animated Underline */}
//                     <span className="absolute -bottom-1 left-0 w-0 h-1 bg-lime-500 transition-all duration-300 group-hover:w-full skew-x-[-20deg]"></span>
//                   </Link>
//                 </li>
//               ))}

//               {user && (
//                 <li>
//                   <Link
//                     to="/orderhistory"
//                     className="relative text-zinc-400 hover:text-white font-bold italic uppercase tracking-widest text-sm transition-all duration-300 group"
//                   >
//                     Orders
//                     <span className="absolute -bottom-1 left-0 w-0 h-1 bg-lime-500 transition-all duration-300 group-hover:w-full skew-x-[-20deg]"></span>
//                   </Link>


//                 </li>

                
//               )}
//             </ul>
//           </div>

//           {/* Right Section */}
//           <div className="hidden md:flex items-center gap-6">
//             {/* Wishlist */}
//             <Link to="/wishlist" className="relative group p-2">
//               <Heart className="w-6 h-6 text-zinc-400 group-hover:text-lime-500 transition-colors" />
//               {wishlist?.length > 0 && (
//                 <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-white text-zinc-950 text-[10px] font-black italic rounded-sm">
//                   {wishlist.length}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link to="/cart" className="relative group p-2">
//               <ShoppingCart className="w-6 h-6 text-zinc-400 group-hover:text-lime-500 transition-colors" />
//               {cart?.length > 0 && (
//                 <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-lime-500 text-zinc-950 text-[10px] font-black italic rounded-sm">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>

//             <div className="h-8 w-1 bg-zinc-800 skew-x-[-20deg]" />

//             {user ? (
//               <div className="flex items-center gap-4">
//                 <span className="text-sm font-bold italic text-white uppercase hidden lg:block">
//                   <span className="text-zinc-500">Player: </span>
//                   {user.name}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="group relative px-6 py-2 bg-zinc-800 overflow-hidden -skew-x-12 hover:bg-lime-500 transition-colors duration-300"
//                 >
//                   <div className="skew-x-12 flex items-center gap-2 text-white font-bold uppercase text-xs tracking-wider">
//                     <span>Logout</span>
//                     <LogOut className="w-3 h-3" />
//                   </div>
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => navigate("/login")}
//                 className="group relative px-8 py-2 bg-lime-500 hover:bg-white transition-colors duration-300 -skew-x-12"
//               >
//                 <div className="skew-x-12 flex items-center gap-2 text-zinc-950 font-black uppercase text-sm tracking-wide">
//                   <User className="w-4 h-4" />
//                   <span>Login</span>
//                 </div>
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center gap-4">
//             <Link to="/cart" className="relative">
//               <ShoppingCart className="w-6 h-6 text-zinc-300" />
//               {cart?.length > 0 && (
//                 <span className="absolute -top-2 -right-2 h-5 w-5 bg-lime-500 text-zinc-950 text-[10px] font-black flex items-center justify-center rounded-sm">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>

//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white hover:text-lime-500 transition-colors"
//             >
//               {isOpen ? (
//                 <X className="w-8 h-8" />
//               ) : (
//                 <Menu className="w-8 h-8" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-zinc-900 border-t-2 border-zinc-800 absolute w-full left-0 z-50">
//           <div className="px-4 pt-6 pb-8 space-y-3">
//             {/* User Mobile */}
//             {user && (
//               <div className="mb-6 pb-4 border-b border-zinc-800 flex items-center gap-4">
//                 <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center text-lime-500 font-black italic text-xl border-2 border-lime-500">
//                   {user.name.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <p className="text-white font-bold italic text-lg uppercase">
//                     {user.name}
//                   </p>
//                   <p className="text-xs text-lime-500 font-mono uppercase tracking-widest">
//                     Active Status
//                   </p>
//                 </div>
//               </div>
//             )}

//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
//               className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all clip-path-slant"
//             >
//               Home
//             </Link>
//             <Link
//               to="/products"
//               onClick={() => setIsOpen(false)}
//               className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all"
//             >
//               Products
//             </Link>
//             <Link
//               to="/about"
//               onClick={() => setIsOpen(false)}
//               className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all"
//             >
//               About
//             </Link>

//             {user && (
//               <Link
//                 to="/orderhistory"
//                 onClick={() => setIsOpen(false)}
//                 className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all"
//               >
//                 Orders
//               </Link>
//             )}

            
//             <div className="flex gap-2 mt-4">
//               <Link
//                 to="/wishlist"
//                 onClick={() => setIsOpen(false)}
//                 className="flex-1 bg-zinc-800 text-center py-3 text-white font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors"
//               >
//                 Wishlist ({wishlist?.length || 0})
//               </Link>
//             </div>

//             <div className="pt-6 mt-2">
//               {user ? (
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsOpen(false);
//                   }}
//                   className="w-full bg-red-600 text-white py-4 font-black italic uppercase tracking-widest hover:bg-red-700 transition-colors clip-path-slant"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     navigate("/login");
//                     setIsOpen(false);
//                   }}
//                   className="w-full bg-lime-500 text-black py-4 font-black italic uppercase tracking-widest hover:bg-white transition-colors"
//                 >
//                   Login Area
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }






import { useContext, useState } from "react";
import { ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/ProviderComp";
import { AuthContext } from "../../../Pages/Authantication/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    state: { cart, wishlist,totalItems },
  } = useContext(cartContext);

  const { user, logout } = useContext(AuthContext);

  console.log("Navbar user:", user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // THEME: Dark background with a "Volt Green" bottom border strip
    <nav className="fixed top-0 w-full z-[999] bg-zinc-950 border-b-4 border-lime-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Italicized and Bold for "Speed" look */}
          <div className="flex-shrink-0 cursor-pointer group">
            <Link to="/" className="flex items-center gap-1">
              {/* Slanted Container */}
              <div className="h-8 px-3 bg-lime-500 -skew-x-12 flex items-center justify-center transform group-hover:skew-x-0 transition-transform duration-300">
                <span className="text-zinc-950 font-black text-xl italic skew-x-12">
                  R
                </span>
              </div>
              <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase ml-1 group-hover:text-lime-400 transition-colors">
                Ride<span className="text-lime-500">Sphere</span>
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
                    className="relative text-zinc-400 hover:text-white font-bold italic uppercase tracking-widest text-sm transition-all duration-300 group"
                  >
                    {item}
                    {/* Animated Underline */}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-lime-500 transition-all duration-300 group-hover:w-full skew-x-[-20deg]"></span>
                  </Link>
                </li>
              ))}

              {user && (
                <li>
                  <Link
                    to="/orderhistory"
                    className="relative text-zinc-400 hover:text-white font-bold italic uppercase tracking-widest text-sm transition-all duration-300 group"
                  >
                    Orders
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-lime-500 transition-all duration-300 group-hover:w-full skew-x-[-20deg]"></span>
                  </Link>
                </li>
              )}

              {/* ADMIN DASHBOARD LINK (Desktop) */}
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="relative text-lime-500 hover:text-lime-400 font-black italic uppercase tracking-widest text-sm transition-all duration-300 group"
                  >
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full skew-x-[-20deg]"></span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative group p-2">
              <Heart className="w-6 h-6 text-zinc-400 group-hover:text-lime-500 transition-colors" />
              {wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-white text-zinc-950 text-[10px] font-black italic rounded-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group p-2">
              <ShoppingCart className="w-6 h-6 text-zinc-400 group-hover:text-lime-500 transition-colors" />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-lime-500 text-zinc-950 text-[10px] font-black italic rounded-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="h-8 w-1 bg-zinc-800 skew-x-[-20deg]" />

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold italic text-white uppercase hidden lg:block">
                  <span className="text-zinc-500">Player: </span>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="group relative px-6 py-2 bg-zinc-800 overflow-hidden -skew-x-12 hover:bg-lime-500 transition-colors duration-300"
                >
                  <div className="skew-x-12 flex items-center gap-2 text-white font-bold uppercase text-xs tracking-wider">
                    <span>Logout</span>
                    <LogOut className="w-3 h-3" />
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="group relative px-8 py-2 bg-lime-500 hover:bg-white transition-colors duration-300 -skew-x-12"
              >
                <div className="skew-x-12 flex items-center gap-2 text-zinc-950 font-black uppercase text-sm tracking-wide">
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </div>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-zinc-300" />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-lime-500 text-zinc-950 text-[10px] font-black flex items-center justify-center rounded-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-lime-500 transition-colors"
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t-2 border-zinc-800 absolute w-full left-0 z-50">
          <div className="px-4 pt-6 pb-8 space-y-3">
            {/* User Mobile */}
            {user && (
              <div className="mb-6 pb-4 border-b border-zinc-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center text-lime-500 font-black italic text-xl border-2 border-lime-500">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-bold italic text-lg uppercase">
                    {user.name}
                  </p>
                  <p className="text-xs text-lime-500 font-mono uppercase tracking-widest">
                    {user.role === "admin" ? "Admin Status" : "Active Status"}
                  </p>
                </div>
              </div>
            )}

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all clip-path-slant"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all"
            >
              About
            </Link>

            {user && (
              <Link
                to="/orderhistory"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 bg-zinc-950 text-white font-bold italic uppercase tracking-wider hover:bg-lime-500 hover:text-black transition-all"
              >
                Orders
              </Link>
            )}

            {/* ADMIN DASHBOARD LINK (Mobile) */}
            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 bg-lime-500 text-zinc-950 font-black italic uppercase tracking-wider hover:bg-white hover:text-black transition-all"
              >
                Dashboard
              </Link>
            )}

            <div className="flex gap-2 mt-4">
              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-zinc-800 text-center py-3 text-white font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors"
              >
                Wishlist ({wishlist?.length || 0})
              </Link>
            </div>

            <div className="pt-6 mt-2">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-600 text-white py-4 font-black italic uppercase tracking-widest hover:bg-red-700 transition-colors clip-path-slant"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="w-full bg-lime-500 text-black py-4 font-black italic uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Login Area
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}