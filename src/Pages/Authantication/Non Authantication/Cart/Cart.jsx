// import React, { useContext, useEffect } from "react";
// import { cartContext } from "../../../../Common/Context/ProviderComp";
// import { Link, Navigate } from "react-router-dom";


// export default function Cart() {
//   const {
//     state: { cart },
//     dispatch,
//   } = useContext(cartContext);

  

//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );



//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

 

//   // 🧩 Quantity functions
//   const handleIncrease = (id) => {
//     dispatch({type : "IncreaseQuantity", payload : id})
//   };

//   const handleDecrease = (id) => {
//     dispatch({type: "DecreaseQuantity", payload : id})
//   };

//   const handleRemove = (id) => {
//     if (window.confirm("Are you sure you want to remove this item?")) {
//       dispatch({ type: "RemoveFromCart", payload: id });
//     }
//   };

//   return (
//     <div className="pt-20 min-h-screen px-[7%] bg-[#f8f9fa]">
//       {cart.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-[60vh] text-center">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//             Your Cart is Empty
//           </h2>
//           <p className="text-gray-500 mb-6">
//             Looks like you haven’t added anything to your cart yet.
//           </p>
//           <Link
//             to="/products"
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition"
//           >
//             Shop Now
//           </Link>
//         </div>
//       ) : (
//         <>
//           <div className="flex flex-col gap-6">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-2xl p-4"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-24 h-24 object-cover rounded-xl"
//                   />
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     <p className="text-sm text-gray-500">{item.brand}</p>
//                     <p className="text-red-500 font-bold">
//                       ₹{item.price.toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 mt-4 md:mt-0">
//                   <button
//                     className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
//                     onClick={() => handleDecrease (item.id)}
//                   >
//                     -
//                   </button>
//                   <span className="px-3">{item.quantity}</span>
//                   <button
//                     className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
//                     onClick={() => handleIncrease (item.id)}
//                     disabled={item.quantity >= item.stock}
//                   >
//                     +
//                   </button>

                 

//                   <button
//                     className="ml-4 px-3 py-1 bg-red-500 text-white rounded-[10px] hover:bg-red-600 cursor-pointer"
//                     onClick={() => handleRemove(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 pb-10 text-right">
//             <h3 className="text-xl font-bold">Total Items: {totalItems}</h3>
//             <h3 className="text-xl font-bold">
//               Total Price: ₹{totalPrice.toLocaleString("en-IN")}
//             </h3>
//             <p className="pt-3">
//               <Link
//                 to="/payment"
//                 className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-[10px] text-lg text-white font-semibold transition"
//               >
//                 Proceed to Checkout
//               </Link>
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }




















import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Authantication/AuthContext";

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useContext(cartContext);

  const { user } = useContext(AuthContext); // ✅ logged-in user
  const [loading, setLoading] = useState(false);

  // 🧠 Fetch cart from db.json (on mount)
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        if (res.data?.cart) {
          dispatch({ type: "SetCart", payload: res.data.cart });
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };
    fetchCart();
  }, [user, dispatch]);

  //  Sync cart changes to db.json whenever cart updates
  useEffect(() => {
    const saveCart = async () => {
      if (!user) return;
      try {
        await axios.patch(`http://localhost:5000/users/${user.id}`, {
          cart,
        });
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    };
    saveCart();
  }, [cart, user]);

  //  Calculations
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  //  Quantity functions
  const handleIncrease = (id) => {
    dispatch({ type: "IncreaseQuantity", payload: id });
  };

  const handleDecrease = (id) => {
    dispatch({ type: "DecreaseQuantity", payload: id });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch({ type: "RemoveFromCart", payload: id });
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-700 text-xl font-semibold">
          Please <Link to="/login" className="text-red-500 underline">Login</Link> to view your cart.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen px-[7%] bg-[#f8f9fa]">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-2xl p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-red-500 font-bold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => handleIncrease(item.id)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded-[10px] hover:bg-red-600 cursor-pointer"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pb-10 text-right">
            <h3 className="text-xl font-bold">Total Items: {totalItems}</h3>
            <h3 className="text-xl font-bold">
              Total Price: ₹{totalPrice.toLocaleString("en-IN")}
            </h3>
            <p className="pt-3">
              <Link
                to="/payment"
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-[10px] text-lg text-white font-semibold transition"
              >
                Proceed to Checkout
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}












