


import React, { useContext } from "react";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import { Link } from "react-router-dom";
import api from "../../../../api/api";
import { AuthContext } from "../../AuthContext";
import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

export default function Cart() {
  const {
    state: { cart, totalPrice, totalItems },
    dispatch,
    loadingCart,
  } = useContext(cartContext);

  // console.log("usecontext", useContext(cartContext));
  // console.log(cart);

  const { user } = useContext(AuthContext);


  const handleIncrease = async (productId) => {
    try {
      const currentItem = cart.find((item) => item.productId._id === productId);
      if (!currentItem) return;

      const newQuantity = currentItem.quantity + 1;

      const res = await api.put("/cart", {
        productId,
        quantity: newQuantity,
      });

      dispatch({ type: "SetCart", payload: res.data });
      // console.log(res.data);
    } catch (error) {
      // console.error(error);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      const currentItem = cart.find(
        (item) => item.productId?._id === productId
      );

      if (!currentItem) return;

      const newQuantity = currentItem.quantity - 1;

      if (newQuantity <= 0) {
        const res = await api.delete("/cart", {
          data: { productId },
        });

        dispatch({ type: "SetCart", payload: res.data });
        return;
      }

      const res = await api.put("/cart", {
        productId,
        quantity: newQuantity,
      });

      dispatch({ type: "SetCart", payload: res.data });
    } catch (error) {
      // console.error("Error decreasing quantity", error.response?.data);
    }
  };

  const handleRemove = async (productId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        const res = await api.delete("/cart", {
          data: { productId },
        });
        dispatch({ type: "SetCart", payload: res.data });
      } catch (error) {
        // console.error(error);
      }
    }
  };

  // console.log({
  //   cart,
  //   totalItems,
  //   totalPrice,
  // });

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
            Please log in to your account to view and manage your cart.
          </p>
          <Link
            to="/login"
            className="block w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }
  if (loadingCart) return null;

  return (
    <div className="pt-24 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto">
        {(cart || []).length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100 mt-8">
            <div className="mb-6 w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <FaShoppingCart className="text-blue-600 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Looks like you haven't added any bicycles or gear to your cart yet.
            </p>
            <Link
              to="/products"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items List */}
              <div className="flex-1 flex flex-col gap-5">
                {cart?.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex flex-col sm:flex-row items-center bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        src={item.productId.images?.[0]?.url}
                        alt={item.productId.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                        {item.productId?.brand}
                      </p>
                      <Link
                        to={`/product/${item.productId?._id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        <h3 className="font-semibold text-lg text-gray-900 mb-1 leading-tight line-clamp-2">
                          {item.productId?.name}
                        </h3>
                      </Link>
                      <p className="text-xl font-bold text-gray-900 mt-2">
                        ₹{item.productId?.price?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6 sm:ml-4">
                      {/* Quantity */}
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm">
                        <button
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                          onClick={() => handleDecrease(item.productId._id)}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-r-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                          onClick={() => handleIncrease(item.productId._id)}
                          disabled={
                            item.quantity >= item.productId.countInStock
                          }
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                        onClick={() => handleRemove(item.productId._id)}
                        title="Remove Item"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Panel */}
              <div className="lg:w-96 flex-shrink-0">
                <div className="bg-white border border-gray-100 rounded-xl p-6 sticky top-28 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-medium text-gray-900">
                        ₹{(totalPrice || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-gray-900 font-bold text-lg">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{(totalPrice || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    to="/payment"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Proceed to Checkout <FaArrowRight size={14} />
                  </Link>

                  <div className="mt-6 flex items-center justify-center text-gray-500 text-sm gap-2">
                    <FaLock size={12} />
                    <span>Secure Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}