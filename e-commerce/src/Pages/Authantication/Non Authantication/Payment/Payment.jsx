import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

import { cartContext } from "../../../../Common/Context/ProviderComp";
import {
  CreditCardIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import api from "../../../../api/api";
import { FaLock } from "react-icons/fa";

export default function Payment() {
  const {
    state: { cart },
    dispatch,
  } = useContext(cartContext);
  const { user } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const navigate = useNavigate();

  const formatPrice = (price) => price.toLocaleString("en-IN");

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!address.trim()) return alert("Enter address");

    try {
      const { data } = await api.post("/orders", {
        orderItems: cart.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          image: item.productId.images[0]?.url,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        shippingAddress: {
          address,
          city: "Your City",
          postalCode: "673001",
          country: "India",
        },
        paymentMethod,
        totalPrice: total,
      });

      dispatch({ type: "ClearCart" });
      //   navigate("/ordersuccess");
      navigate("/ordersuccess", { state: { success: true } });
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      alert("Order failed");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-zinc-950 py-12 px-[7%] flex flex-col lg:flex-row gap-10 relative overflow-hidden text-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto">
        {/* LEFT - Payment Form */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 flex-1 shadow-2xl relative">
          {/* Top Border Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-lime-500 to-red-600" />

          <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
            <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
              Payment <span className="text-zinc-500">Details</span>
            </h2>
          </div>

          {/* Address */}
          <div className="mb-8">
            <label className="block text-lime-500 font-bold uppercase text-xs tracking-widest mb-2 ml-1">
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 px-6 py-4 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 font-medium italic transition-all"
              placeholder="ENTER YOUR FULL ADDRESS..."
            />
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <label className="block text-lime-500 font-bold uppercase text-xs tracking-widest mb-3 ml-1">
              Select Payment Method
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-center gap-3 p-4 border transition-all duration-300 transform -skew-x-6 ${
                  paymentMethod === "card"
                    ? "border-lime-500 bg-lime-500 text-zinc-950 font-black italic uppercase tracking-wider"
                    : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-lime-500 hover:text-white"
                }`}
              >
                <CreditCardIcon className="w-6 h-6 transform skew-x-6" />
                <span className="transform skew-x-6">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`flex items-center justify-center gap-3 p-4 border transition-all duration-300 transform -skew-x-6 ${
                  paymentMethod === "upi"
                    ? "border-lime-500 bg-lime-500 text-zinc-950 font-black italic uppercase tracking-wider"
                    : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-lime-500 hover:text-white"
                }`}
              >
                <BuildingLibraryIcon className="w-6 h-6 transform skew-x-6" />
                <span className="transform skew-x-6">UPI</span>
              </button>
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center justify-center gap-3 p-4 border transition-all duration-300 transform -skew-x-6 ${
                  paymentMethod === "cod"
                    ? "border-lime-500 bg-lime-500 text-zinc-950 font-black italic uppercase tracking-wider"
                    : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-lime-500 hover:text-white"
                }`}
              >
                <BanknotesIcon className="w-6 h-6 transform skew-x-6" />
                <span className="transform skew-x-6">COD</span>
              </button>
            </div>
          </div>

          {/* Card Form */}
          {paymentMethod === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-zinc-950 p-6 border border-zinc-800">
              {["name", "number", "expiry", "cvv"].map((field, i) => (
                <div
                  key={i}
                  className={
                    field === "name" || field === "number"
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <label className="block text-zinc-500 font-bold uppercase text-[10px] tracking-widest mb-1 ml-1">
                    {field === "name"
                      ? "Name on Card"
                      : field === "number"
                      ? "Card Number"
                      : field === "expiry"
                      ? "Expiry"
                      : "CVV"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      field === "name"
                        ? "JOHN DOE"
                        : field === "number"
                        ? "0000 0000 0000 0000"
                        : field === "expiry"
                        ? "MM/YY"
                        : "123"
                    }
                    value={cardDetails[field]}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 focus:outline-none focus:border-red-500 font-mono tracking-widest"
                  />
                </div>
              ))}
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="mb-8">
              <label className="block text-lime-500 font-bold uppercase text-xs tracking-widest mb-2 ml-1">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="name@upi"
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 px-6 py-4 focus:outline-none focus:border-lime-500 font-medium italic"
              />
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            className="group w-full bg-red-600 text-white py-4 font-black italic uppercase tracking-widest text-lg transform -skew-x-6 hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-red-900/20"
          >
            <span className="flex items-center justify-center gap-3 transform skew-x-6">
              Place Order
            </span>
          </button>

          <div className="mt-4 text-center flex items-center justify-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <FaLock size={10} /> Secure Encrypted Transaction
          </div>
        </div>

        {/* RIGHT - Summary */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 w-full lg:w-[35%] h-fit shadow-2xl relative">
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-lime-500" />

          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 border-b border-zinc-800 pb-4">
            Order <span className="text-lime-500">Summary</span>
          </h2>

          {cart.length === 0 ? (
            <p className="text-zinc-500 font-medium italic">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex justify-between items-center pb-4 border-b border-zinc-800/50 last:border-0"
                >
                  <span className="font-bold text-zinc-300 text-sm uppercase tracking-wide">
                    {item.productId.name}{" "}
                    <span className="text-lime-500">x{item.quantity}</span>
                  </span>
                  <span className="font-black italic text-white">
                    ₹{formatPrice(item.productId.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="border-t-2 border-zinc-700 pt-6 mt-6 flex justify-between items-center">
                <span className="font-black italic uppercase text-lg text-white tracking-wider">
                  Total
                </span>
                <span className="text-3xl font-black italic text-lime-500">
                  ₹{formatPrice(total)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
