import React, { useContext, useEffect, useState } from "react";
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
  FaFlagCheckered,
} from "react-icons/fa";

export default function Cart() {
  const {
    state: { cart, totalPrice, totalItems },
    dispatch,
    loadingCart,
  } = useContext(cartContext);

  console.log("usecontext",useContext(cartContext));

  console.log(cart);

  const { user } = useContext(AuthContext);

  // const totalPrice = cart.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0,
  // );

  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDecrease = async (productId) => {
    try {
      const currentItem = cart.find(
        (item) => item.productId?._id === productId,
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
      console.error("Error decreasing quantity", error.response?.data);
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
        console.error(error);
      }
    }
  };

  console.log({
  cart,
  totalItems,
  totalPrice
});

  // Not Logged In State
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-950 relative overflow-hidden text-white">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 blur-[100px] rounded-full" />
          <div className="absolute top-0 left-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        </div>

        <div className="z-10 text-center p-10 border-2 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transform -skew-x-6 max-w-lg">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-zinc-950 border border-zinc-700 rounded-full flex items-center justify-center text-red-600">
              <FaLock size={24} />
            </div>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">
            Restricted <span className="text-red-600">Area</span>
          </h2>
          <p className="text-zinc-400 font-medium mb-8 uppercase tracking-wide text-sm">
            Login to view your cart equipment.
          </p>
          <Link
            to="/login"
            className="inline-block bg-lime-500 text-zinc-950 px-8 py-3 font-black italic uppercase tracking-widest hover:bg-white transition-colors transform skew-x-6"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen px-[7%] bg-zinc-950 text-white relative overflow-hidden pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="mb-6 p-6 bg-zinc-900 rounded-full border border-zinc-800">
              <FaShoppingCart className="text-zinc-700 text-6xl" />
            </div>
            <h2 className="text-4xl font-black italic uppercase text-white mb-2 tracking-tighter">
              Your Cart is <span className="text-zinc-600">Empty</span>
            </h2>
            <p className="text-zinc-400 mb-8 font-medium uppercase tracking-wide text-sm max-w-md">
              Looks like you haven’t added any gear to your setup yet.
            </p>
            <Link
              to="/products"
              className="group relative px-8 py-3 bg-red-600 overflow-hidden skew-x-[-12deg] hover:bg-white transition-all duration-300"
            >
              <span className="relative skew-x-[12deg] text-white group-hover:text-black font-black uppercase tracking-widest flex items-center gap-2">
                Start Shopping
              </span>
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
              <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
              <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white tracking-tighter">
                Your <span className="text-lime-500">Cart</span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Cart Items List */}
              <div className="flex-1 flex flex-col gap-6">
                {cart?.map((item) => (
                  <div
                    key={item.productId._id}
                    className="group flex flex-col md:flex-row items-center bg-zinc-900 border border-zinc-800 p-6 relative transition-all duration-300 hover:border-lime-500/50 hover:shadow-lg hover:shadow-lime-500/10"
                  >
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all duration-300" />

                    {/* Image */}
                    <div className="w-24 h-24 bg-white border border-zinc-800 p-2 flex-shrink-0 transform -skew-x-6 mr-6 mb-4 md:mb-0">
                      <img
                        src={item.productId.images?.[0]?.url}
                        alt={item.productId.name}
                        className="w-full h-full object-contain transform skew-x-6"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                      <p className="text-xs font-bold text-lime-500 uppercase tracking-widest mb-1">
                        {item.productId?.brand}
                      </p>
                      <h3 className="font-black italic uppercase text-lg text-white tracking-tight mb-1">
                        {item.productId?.name}
                      </h3>
                      <p className="text-xl font-black italic text-zinc-400">
                        ₹{item.productId?.price?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6">
                      {/* Quantity */}
                      <div className="flex items-center bg-zinc-950 border border-zinc-700 transform -skew-x-12">
                        <button
                          className="px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          onClick={() => handleDecrease(item.productId._id)}
                        >
                          <FaMinus size={10} className="transform skew-x-12" />
                        </button>
                        <span className="px-3 font-black italic text-white transform skew-x-12 min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-2 text-lime-500 hover:text-black hover:bg-lime-500 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-lime-500"
                          onClick={() => handleIncrease(item.productId._id)}
                          disabled={
                            item.quantity >= item.productId.countInStock
                          }
                        >
                          <FaPlus size={10} className="transform skew-x-12" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        className="text-zinc-600 hover:text-red-600 transition-colors p-2"
                        onClick={() => handleRemove(item.productId._id)}
                        title="Remove Item"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Panel */}
              <div className="lg:w-96 flex-shrink-0">
                <div className="bg-zinc-900 border-2 border-zinc-800 p-8 sticky top-28 shadow-2xl">
                  <h3 className="text-xl font-black italic uppercase text-white mb-6 border-b border-zinc-800 pb-4">
                    Summary
                  </h3>

                  <div className="flex justify-between items-center mb-4 text-zinc-400 font-bold uppercase text-sm tracking-wide">
                    <span>Total Items</span>
                    <span className="text-white">{totalItems}</span>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="text-zinc-400 font-bold uppercase text-sm tracking-wide">
                      Total Price
                    </span>
                    <span className="text-3xl font-black italic text-lime-500">
                      ₹{(totalPrice || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    to="/payment"
                    className="group block w-full bg-red-600 text-white py-4 text-center font-black italic uppercase tracking-widest transform -skew-x-6 hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-red-900/20"
                  >
                    <span className="flex items-center justify-center gap-2 transform skew-x-6">
                      Checkout <FaArrowRight />
                    </span>
                  </Link>

                  <div className="mt-6 text-center">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <FaLock size={10} /> Secure Racing Checkout
                    </p>
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
