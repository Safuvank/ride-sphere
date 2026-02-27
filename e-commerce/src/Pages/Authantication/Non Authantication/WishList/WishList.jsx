import React, { useEffect, useState, useContext } from "react";
import api from "../../../../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { FaShoppingCart, FaTrash, FaHeartBroken, FaLock } from "react-icons/fa";
import { cartContext } from "../../../../Common/Context/ProviderComp";

export default function Wishlist() {
  const { user } = useContext(AuthContext);
  const {
    state: { wishlist },
    dispatch,
  } = useContext(cartContext);

  const handleRemove = async (productId) => {
    try {
      const res = await api.delete(`/wishlist/${productId}`);

      dispatch({
        type: "SetWishlist",
        payload: wishlist.filter((item) => item._id !== productId),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const res = await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      // Optionally remove from wishlist
      await api.delete(`/wishlist/${product._id}`);
    } catch (error) {
      console.error(error);
    }
  };

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
            Restricted <span className="text-red-600">Access</span>
          </h2>
          <p className="text-zinc-400 font-medium mb-8 uppercase tracking-wide text-sm">
            Login to access your saved gear.
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
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="mb-6 p-6 bg-zinc-900 rounded-full border border-zinc-800">
              <FaHeartBroken className="text-zinc-700 text-6xl" />
            </div>
            <h2 className="text-4xl font-black italic uppercase text-white mb-2 tracking-tighter">
              Your Wishlist is <span className="text-zinc-600">Empty</span>
            </h2>
            <p className="text-zinc-400 mb-8 font-medium uppercase tracking-wide text-sm max-w-md">
              Your garage is looking a bit empty. Browse our collection and save
              your favorite rides.
            </p>
            <Link
              to="/products"
              className="group relative px-8 py-3 bg-red-600 overflow-hidden skew-x-[-12deg] hover:bg-white transition-all duration-300"
            >
              <span className="relative skew-x-[12deg] text-white group-hover:text-black font-black uppercase tracking-widest flex items-center gap-2">
                Start Browsing
              </span>
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
              <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
              <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white tracking-tighter">
                My Wishlist{" "}
                <span className="text-lime-500 text-xl align-top">
                  ({wishlist.length})
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.product._id}
                  className="group flex flex-col md:flex-row items-center justify-between bg-zinc-900 border border-zinc-800 p-6 relative transition-all duration-300 hover:border-lime-500/50 hover:shadow-lg hover:shadow-lime-500/10 hover:-translate-y-1"
                >
                  {/* Corner Accent */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-transparent border-1-zinc-800 group-hover:border-l-lime-500 transition-all duration-300" />

                  <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                    {/* Image Container */}
                    <div className="w-32 h-32 bg-white border border-zinc-800 p-2 flex-shrink-0 transform -skew-x-6">
                      <img
                        src={product.product.images?.[0]?.url}
                        alt={product.product.name}
                        className="w-full h-full object-contain transform skew-x-6 filter brightness-90 group-hover:brightness-110 transition-all"
                      />
                    </div>

                    {/* Text Info */}
                    <div className="text-center md:text-left">
                      <p className="text-xs font-bold text-lime-500 uppercase tracking-widest mb-1">
                        {product.product.brand}
                      </p>
                      <h3 className="text-xl font-black italic uppercase text-white tracking-tight mb-2">
                        {product.product.name}
                      </h3>
                      <p className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                        ₹{product.product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-6 md:mt-0 w-full md:w-auto justify-center">
                    <button
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 text-zinc-950 font-black italic uppercase tracking-wider text-sm hover:bg-white hover:scale-105 transition-all duration-300 transform -skew-x-12"
                      onClick={() => handleAddToCart(product)}
                    >
                      <span className="transform skew-x-12 flex items-center gap-2">
                        <FaShoppingCart /> Add
                      </span>
                    </button>

                    <button
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-zinc-950 border border-zinc-700 text-red-500 font-black italic uppercase tracking-wider text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 transform -skew-x-12"
                      onClick={() => handleRemove(product._id)}
                    >
                      <span className="transform skew-x-12 flex items-center gap-2">
                        <FaTrash /> Remove
                      </span>
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
