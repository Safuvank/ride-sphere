import React, { useContext } from "react";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const {
    state: { wishlist },
    dispatch,
  } = useContext(cartContext);

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch({ type: "RemoveFromWishlist", payload: id });
    }
  };

  const handleAddToCart = (item) => {
    dispatch({ type: "AddToCart", payload: item });
    dispatch({ type: "RemoveFromWishlist", payload: item.id });
  };

  return (
    <div className="pt-20 min-h-screen px-[7%] bg-[#f8f9fa]">
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 mb-6">
            Browse products and add your favorites to your wishlist.
          </p>
          <Link
            to="/products"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            My Wishlist ({wishlist.length})
          </h2>

          <div className="flex flex-col gap-6 pb-10">
            {wishlist.map((item) => (
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

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
