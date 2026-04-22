

import React, { useContext } from "react";
import api from "../../../../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { FaShoppingCart, FaTrash, FaHeart, FaLock } from "react-icons/fa";
import { cartContext } from "../../../../Common/Context/ProviderComp";

export default function Wishlist() {
  const { user } = useContext(AuthContext);
  const {
    state: { wishlist },
    dispatch,
  } = useContext(cartContext);

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);

      dispatch({
        type: "SetWishlist",
        payload: wishlist.filter((item) => item._id !== productId),
      });
    } catch (error) {
      // console.error(error);
    }
  };

  // const handleAddToCart = async (product) => {
  //   try {
  //     await api.post("/cart", {
  //       productId: product._id,
  //       quantity: 1,
  //     });

  //     dispatch({
  //     type: "SetCart",
  //     payload: res.data,
  //   });

  //     await api.delete(`/wishlist/${product._id}`);

  //     dispatch({
  //       type: "SetWishlist",
  //       payload: wishlist.filter((item) => item._id !== product._id),
  //     });
  //   } catch (error) {
  //     // console.error(error);
  //   }
  // };


  const handleAddToCart = async (product) => {
  try {
    const res = await api.post("/cart", {
      productId: product._id,
      quantity: 1,
    });

    // ✅ IMPORTANT: update cart state
    dispatch({
      type: "SetCart",
      payload: res.data,
    });

    // remove from wishlist
    await api.delete(`/wishlist/${product._id}`);

    dispatch({
      type: "SetWishlist",
      payload: wishlist.filter((item) => item._id !== product._id),
    });

  } catch (error) {
    // console.error(error);
  }
};

  // Not Logged In State
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <FaLock size={24} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Sign in required
          </h2>
          <p className="text-gray-600 mb-8">
            Please log in to your account to view and manage your saved items.
          </p>
          <Link
            to="/login"
            className="block w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
      <div className="max-w-5xl mx-auto">
        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100 mt-8">
            <div className="mb-6 w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
              <FaHeart className="text-red-400 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              You haven't saved any items yet. Browse our collection and heart your favorite rides.
            </p>
            <Link
              to="/products"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start Browsing
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm font-medium">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Wishlist Items */}
            <div className="flex flex-col gap-4">
              {wishlist?.filter(Boolean).map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row items-center bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="w-28 h-28 bg-gray-50 rounded-lg p-3 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {product.brand}
                    </p>
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-red-600 rounded-lg font-medium hover:bg-red-50 hover:border-red-100 transition-colors"
                      onClick={() => handleRemove(product._id)}
                      title="Remove from Wishlist"
                    >
                      <FaTrash size={16} />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}