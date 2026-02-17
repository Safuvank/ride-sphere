




// import React, { createContext, useReducer, useEffect, useContext } from "react";
// import axios from "axios";
// import reducer from "./Reducer";
// import { AuthContext } from "../../Pages/Authantication/AuthContext";

// export const cartContext = createContext();

// export const ProviderComp = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const userKey = user ? user.email : "guest"; // unique key per user

//   const initialState = {
//     cart: JSON.parse(localStorage.getItem(`${userKey}_cart`)) || [],
//     wishlist: JSON.parse(localStorage.getItem(`${userKey}_wishlist`)) || [],
//     orders: JSON.parse(localStorage.getItem(`${userKey}_orders`)) || [],
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   // 🧠 Save per-user to localStorage
//   useEffect(() => {
//     localStorage.setItem(`${userKey}_cart`, JSON.stringify(state.cart));
//     localStorage.setItem(`${userKey}_wishlist`, JSON.stringify(state.wishlist));
//     localStorage.setItem(`${userKey}_orders`, JSON.stringify(state.orders));
//   }, [state, userKey]);

//   // 🧠 Save per-user to db.json (JSON Server)
//   useEffect(() => {
//     const saveUserDataToDB = async () => {
//       if (user) {
//         try {
//           // find user in db.json by email
//           const { data } = await axios.get(
//             `http://localhost:5000/users?email=${user.email}`
//           );

//           if (data.length > 0) {
//             const userId = data[0].id;

//             // update existing user data
//             await axios.patch(`http://localhost:5000/users/${userId}`, {
//               cart: state.cart,
//               wishlist: state.wishlist,
//               orders: state.orders,
//             });
//           }
//         } catch (error) {
//           console.error("Error saving user data to DB:", error);
//         }
//       }
//     };

//     saveUserDataToDB();
//   }, [state, user]); // sync whenever user or data changes


//   useEffect(()=>{
//     if(!user){
//       dispatch({type : "SetData", payload: {cart: [], wishlist: [], orders: []}})
//     }
//   });

//    localStorage.removeItem("guest_cart");
//   localStorage.removeItem("guest_wishlist");
//   localStorage.removeItem("guest_orders")


 

//   return (
//     <cartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </cartContext.Provider>
//   );
// };






















import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import reducer from "./Reducer";
import { AuthContext } from "../../Pages/Authantication/AuthContext";

export const cartContext = createContext();

export const ProviderComp = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userKey = user ? user.email : "guest"; // unique key per user

  const initialState = {
    cart: JSON.parse(localStorage.getItem(`${userKey}_cart`)) || [],
    wishlist: JSON.parse(localStorage.getItem(`${userKey}_wishlist`)) || [],
    orders: JSON.parse(localStorage.getItem(`${userKey}_orders`)) || [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // ✅ Save data per user to localStorage
  useEffect(() => {
    localStorage.setItem(`${userKey}_cart`, JSON.stringify(state.cart));
    localStorage.setItem(`${userKey}_wishlist`, JSON.stringify(state.wishlist));
    localStorage.setItem(`${userKey}_orders`, JSON.stringify(state.orders));
  }, [state, userKey]);

  // ✅ Sync user data to db.json (JSON Server)
  useEffect(() => {
    const saveUserDataToDB = async () => {
      if (user) {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/users?email=${user.email}`
          );

          if (data.length > 0) {
            const userId = data[0].id;

            await axios.patch(`http://localhost:5000/users/${userId}`, {
              cart: state.cart,
              wishlist: state.wishlist,
              orders: state.orders,
            });
          }
        } catch (error) {
          console.error("Error saving user data to DB:", error);
        }
      }
    };

    saveUserDataToDB();
  }, [state, user]);

  // // ✅ Clear data when user logs out
  // useEffect(() => {
  //   if (!user) {
  //     // clear reducer state
  //     dispatch({
  //       type: "SetData",
  //       payload: { cart: [], wishlist: [], orders: [] },
  //     });

  //     // clear guest localStorage
  //     localStorage.removeItem("guest_cart");
  //     localStorage.removeItem("guest_wishlist");
  //     localStorage.removeItem("guest_orders");
  //   }
  // }, [user]);

  return (
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};

















































// import React, { createContext, useReducer, useEffect, useContext } from "react";
// import reducer from "./Reducer";
// import { AuthContext } from "../../Pages/Authantication/AuthContext";

// export const cartContext = createContext();

// export const ProviderComp = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const userKey = user ? user.email : "guest";

//   const initialState = {
//     cart: JSON.parse(localStorage.getItem(`${userKey}_cart`)) || [],
//     wishlist: JSON.parse(localStorage.getItem(`${userKey}_wishlist`)) || [],
//     orders: JSON.parse(localStorage.getItem(`${userKey}_orders`)) || [],
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   // 🔄 Update localStorage when state changes
//   useEffect(() => {
//     localStorage.setItem(`${userKey}_cart`, JSON.stringify(state.cart));
//     localStorage.setItem(`${userKey}_wishlist`, JSON.stringify(state.wishlist));
//     localStorage.setItem(`${userKey}_orders`, JSON.stringify(state.orders));
//   }, [state, userKey]);

//   // 🧠 Reload data when user logs in
//   useEffect(() => {
//     if (user) {
//       const savedCart = JSON.parse(localStorage.getItem(`${userKey}_cart`)) || [];
//       const savedWishlist = JSON.parse(localStorage.getItem(`${userKey}_wishlist`)) || [];
//       const savedOrders = JSON.parse(localStorage.getItem(`${userKey}_orders`)) || [];

//       dispatch({
//         type: "SetData",
//         payload: { cart: savedCart, wishlist: savedWishlist, orders: savedOrders },
//       });
//     } else {
//       // 🧹 Clear data when user logs out
//       dispatch({
//         type: "SetData",
//         payload: { cart: [], wishlist: [], orders: [] },
//       });
//     }
//   }, [user]);

//   return (
//     <cartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </cartContext.Provider>
//   );
// };




// import React, { createContext, useReducer, useEffect, useContext } from "react";
// import reducer from "./Reducer";
// import { AuthContext } from "../../Pages/Authantication/AuthContext";

// export const cartContext = createContext();

// export const ProviderComp = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const userKey = user ? user.email : "guest";

//   const [state, dispatch] = useReducer(reducer, {
//     cart: [],
//     wishlist: [],
//     orders: [],
//   });

//   // ✅ Load data from localStorage when user changes
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem(`${userKey}_cart`)) || [];
//     const savedWishlist = JSON.parse(localStorage.getItem(`${userKey}_wishlist`)) || [];
//     const savedOrders = JSON.parse(localStorage.getItem(`${userKey}_orders`)) || [];

//     dispatch({
//       type: "SetData",
//       payload: {
//         cart: savedCart,
//         wishlist: savedWishlist,
//         orders: savedOrders,
//       },
//     });
//   }, [userKey]);

//   // ✅ Save data to localStorage when state changes
//   useEffect(() => {
//     localStorage.setItem(`${userKey}_cart`, JSON.stringify(state.cart));
//     localStorage.setItem(`${userKey}_wishlist`, JSON.stringify(state.wishlist));
//     localStorage.setItem(`${userKey}_orders`, JSON.stringify(state.orders));
//   }, [state, userKey]);

//   return (
//     <cartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </cartContext.Provider>
//   );
// };
