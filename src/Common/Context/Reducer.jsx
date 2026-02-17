// export default function reducer(state, action) {
//   switch (action.type) {
//     case "SetData":
//       return {...state, cart: action.payload.cart || [], wishlist : action.payload.wishlist || [], orders : action.payload.orders || []}

//     case "AddToCart":
//       return {...state,cart: [...state.cart, { ...action.payload, quantity: 1 }],};

//     case "RemoveFromCart":
//       return {...state,cart: state.cart.filter((item) => item.id !== action.payload),};

//     case "IncreaseQuantity":
//       return {...state, cart: state.cart.map((item) => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item),};

//     case "DecreaseQuantity":
//       return {...state, cart: state.cart.map((item) => item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item),};

//     case "AddToWishlist":
//       return {...state,wishlist: [...state.wishlist, action.payload],};

//     case "RemoveFromWishlist":
//       return {...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload),};

//     case "ClearCart" :
//       return {...state, cart: []};

//     case "SaveOrder" :
//       return {...state, orders : [...state.orders, action.payload], cart: [],}

//     default:
//       return state;
//   }
// }













export default function reducer(state, action) {
  switch (action.type) {
    case "SetData":
      return {
        ...state,
        cart: action.payload.cart || [],
        wishlist: action.payload.wishlist || [],
        orders: action.payload.orders || [],
      };

    case "AddToCart":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "RemoveFromCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "IncreaseQuantity":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DecreaseQuantity":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "AddToWishlist":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case "RemoveFromWishlist":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };

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







