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
    0
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
      navigate("/ordersuccess", { state: { success: true } });
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      alert("Order failed");
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT - Payment Form */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
              Payment Details
            </h2>

            {/* Address */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter your full delivery address..."
              />
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <CreditCardIcon className="w-5 h-5" />
                  <span>Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === "upi"
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <BuildingLibraryIcon className="w-5 h-5" />
                  <span>UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <BanknotesIcon className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                {["name", "number", "expiry", "cvv"].map((field, i) => (
                  <div
                    key={i}
                    className={
                      field === "name" || field === "number"
                        ? "md:col-span-2"
                        : ""
                    }
                  >
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      {field === "name"
                        ? "Name on Card"
                        : field === "number"
                        ? "Card Number"
                        : field === "expiry"
                        ? "Expiry Date"
                        : "CVV"}
                    </label>
                    <input
                      type={field === "number" || field === "cvv" ? "tel" : "text"}
                      placeholder={
                        field === "name"
                          ? "John Doe"
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
                      className="w-full bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* UPI Form */}
            {paymentMethod === "upi" && (
              <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="username@bank"
                  className="w-full bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Place Order
            </button>

            <div className="mt-5 text-center flex items-center justify-center gap-2 text-gray-500 text-sm">
              <FaLock size={12} /> Secure Encrypted Transaction
            </div>
          </div>
        </div>

        {/* RIGHT - Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              Order Summary
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex justify-between items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                  >
                    <div className="pr-4">
                      <span className="font-medium text-gray-900 text-sm block">
                        {item.productId.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 whitespace-nowrap">
                      ₹{formatPrice(item.productId.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">₹{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-bold text-lg text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}