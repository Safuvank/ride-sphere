// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const { signup } = useContext(AuthContext); // signup 

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignUp = (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:5000/users")
//       const exists = res.data.find((u)=> u.email === email);
//       if(exists){
//         setError("Email Already Exists!");
//         return;
//       }
//     }


//     //create new user object

//     const newUser = {name, email, password};

//     // save to db.json 

//     await axios.post("http://localhost:5000/users", newUser)

//     // also store locally

//     const localUsers = JSON.parse(localStorage.getItem("users")) || [];
//     localUsers.push(newUser)
//     localStorage.setItem("users", JSON.stringify(localUsers))
//     // const exists = users.find((u) => u.email === email);

//     if (exists) {
//       setError("Email already exists!");
//       return;
//     }

//     const newUser = { name, email, password };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));

//     signup(newUser); // 
//     navigate("/login");
//   } catch(err){
//     console.log("Error saving user: ", err);
//     setError("Failed to register user. Please try again")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
//           Sign Up
//         </h2>
//         <p className="text-gray-500 mb-6 text-center">
//           Create your RideSphere account
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSignUp} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//           />

//           <input
//             type="email"
//             placeholder="Email address"
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
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-red-500 font-medium hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const { signup } = useContext(AuthContext);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       // 1️⃣ Check if email already exists in db.json
//       const res = await axios.get("http://localhost:5000/users");
//       const exists = res.data.find((u) => u.email === email);
//       if (exists) {
//         setError("Email already exists!");
//         return;
//       }

//       // 2️⃣ Create new user object
//       const newUser = { id : Math.random().toString(16).slice(2,6),
//         name,
//         email,
//         password,
//         blocked: false
//        };

//       // 3️⃣ Save to db.json via POST
//       await axios.post("http://localhost:5000/users", newUser);

//       // 4️⃣ Optional: also store locally
//       const localUsers = JSON.parse(localStorage.getItem("users")) || [];
//       localUsers.push(newUser);
//       localStorage.setItem("users", JSON.stringify(localUsers));

//       signup(newUser);
//       navigate("/login");
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Failed to Signup user. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
//           Sign Up
//         </h2>
//         <p className="text-gray-500 mb-6 text-center">
//           Create your RideSphere account
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSignUp} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//           />

//           <input
//             type="email"
//             placeholder="Email address"
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
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-red-500 font-medium hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }













// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const { signup } = useContext(AuthContext);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       // ✅ 1. Fetch existing users
//       const res = await axios.get("http://localhost:5000/users");

//       // ✅ 2. Check for duplicate email
//       const exists = res.data.find((u) => u.email === email);
//       if (exists) {
//         setError("Email already exists!");
//         return;
//       }

//       // ✅ 3. Create new user object
//       const newUser = {
//         id: Date.now(),
//         name,
//         email,
//         password,
//         blocked: false,
//       };

//       // ✅ 4. Save user to JSON Server
//       await axios.post("http://localhost:5000/users", newUser);

//       // ✅ 5. Store user locally (optional)
//       localStorage.setItem("currentUser", JSON.stringify(newUser));

//       // ✅ 6. Update context and redirect
//       signup(newUser);
//       navigate("/login");
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Failed to sign up. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
//           Sign Up
//         </h2>
//         <p className="text-gray-500 mb-6 text-center">
//           Create your RideSphere account
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSignUp} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//           />

//           <input
//             type="email"
//             placeholder="Email address"
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
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-red-500 font-medium hover:underline">
//             Login
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

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      //  1. Get all users from db.json
      const res = await axios.get("http://localhost:5000/users");

      // 2. Check for existing email
      const exists = res.data.find((u) => u.email === email);
      if (exists) {
        setError("Email already exists!");
        return;
      }

      //  3. Create user with cart, wishlist, orders
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        blocked: false,
        cart: [],
        wishlist: [],
        orders: []
      };

      // ✅ 4. Save to db.json
      await axios.post("http://localhost:5000/users", newUser);

      // ✅ 5. Store locally (optional)
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // ✅ 6. Context & redirect
      signup(newUser);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
          Sign Up
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Create your RideSphere account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email address"
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
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
