import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import reducer from "./Reducer";
import api from "../../api/api";
import { AuthContext } from "../../Pages/Authantication/AuthContext";

export const cartContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  orders: [],
  totalPrice: 0,
  totalItems: 0,
};

// console.log("initialState", initialState);

export const ProviderComp = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    if (!user) {
      // dispatch({ type: "SetCart", payload: [] });
      dispatch({
        type: "SetCart",
        payload: {
          products: [],
          totalItems: 0,
          totalPrice: 0,
        },
      });
      dispatch({ type: "SetWishlist", payload: [] });
      return;
    }
    setLoadingCart(true);
    const loadUserData = async () => {
      try {
        const cartRes = await api.get("/cart");
        dispatch({ type: "SetCart", payload: cartRes.data });

        const wishlistRes = await api.get("/wishlist");
        // dispatch({ type: "SetWishlist", payload: wishlistRes.data.products });
        dispatch({
          type: "SetWishlist",
          payload: wishlistRes.data.products.map((item) => item.product),
        });
        setLoadingCart(false);
      } catch (error) {
        // console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [user]);

  return (
    <cartContext.Provider value={{ state, dispatch, loadingCart }}>
      {children}
    </cartContext.Provider>
  );
};
