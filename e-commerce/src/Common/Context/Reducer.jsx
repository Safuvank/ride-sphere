export default function reducer(state, action) {
  switch (action.type) {
    case "SetCart":
      return {
        ...state,
        cart: action.payload,
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
      };

    default:
      return state;
  }
}
