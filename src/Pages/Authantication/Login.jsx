// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill all fields!");
//       return;
//     }

//     try {
//       const { data } = await axios.get("http://localhost:5000/users");

//       //  Find matching user
//       const user = data.find(
//         (u) => u.email === email && u.password === password
//       );

//       if (!user) {
//         setError("Invalid email or password!");
//         return;
//       }

//       if (user.blocked) {
//         setError("Your account is blocked!");
//         return;
//       }

//       //  Save user in context
//       login(user);

//        localStorage.setItem(`${user.email}_cart`, JSON.stringify(user.cart || []));
//         localStorage.setItem(`${user.email}_wishlist`, JSON.stringify(user.wishlist || []));
//         localStorage.setItem(`${user.email}_orders`, JSON.stringify(user.orders || []))


//       //  Check admin condition
//       navigate(user.email === "admin@ridesphere.com" && user.password === "123456" ? "/admin" : "/");
    
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Failed to log in.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Login to your RideSphere account
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="mt-5 text-center text-gray-600 text-sm">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-red-500 font-medium hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }









import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔄 Helper: Merge arrays from backend and localStorage without duplicates
  const mergeData = (localData, serverData) => {
    const parsedLocal = JSON.parse(localData || "[]");
    const merged = [...serverData];

    parsedLocal.forEach((item) => {
      if (!merged.find((i) => i.id === item.id)) {
        merged.push(item);
      }
    });

    return merged;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:5000/users");

      // ✅ Find matching user
      const user = data.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setError("Invalid email or password!");
        return;
      }

      if (user.blocked) {
        setError("Your account is blocked!");
        return;
      }

      // ✅ Save user in context
      login(user);

      // ✅ Merge and persist data safely
      const existingCart = localStorage.getItem(`${user.email}_cart`);
      const existingWishlist = localStorage.getItem(`${user.email}_wishlist`);
      const existingOrders = localStorage.getItem(`${user.email}_orders`);

      const mergedCart = mergeData(existingCart, user.cart || []);
      const mergedWishlist = mergeData(existingWishlist, user.wishlist || []);
      const mergedOrders = mergeData(existingOrders, user.orders || []);

      localStorage.setItem(`${user.email}_cart`, JSON.stringify(mergedCart));
      localStorage.setItem(
        `${user.email}_wishlist`,
        JSON.stringify(mergedWishlist)
      );
      localStorage.setItem(`${user.email}_orders`, JSON.stringify(mergedOrders));

      // ✅ Sync merged data back to JSON server
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        cart: mergedCart,
        wishlist: mergedWishlist,
        orders: mergedOrders,
      });

      // ✅ Redirect user
      navigate(
        user.email === "admin@ridesphere.com" && user.password === "123456"
          ? "/admin"
          : "/"
      );
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your RideSphere account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
