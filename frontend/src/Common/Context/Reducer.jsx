export default function reducer(state, action) {
  switch (action.type) {
    case "SetCart":
      return {
        ...state,
        cart: action.payload.products,
        totalPrice: action.payload.totalPrice,
        totalItems: action.payload.totalItems
      };

    case "SetWishlist":
      return { ...state, wishlist: action.payload };

    case "ClearCart":
      return { ...state, cart: [] };

    case "SaveOrder":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [],
        totalPrice: 0,     // ✅ FIX
    totalItems: 0,
      };

    default:
      return state;
  }
}
