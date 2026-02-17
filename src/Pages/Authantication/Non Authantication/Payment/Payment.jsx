import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import {
  CreditCardIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export default function Payment() {
  const {
    state: { cart },
    dispatch,
  } = useContext(cartContext);
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
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!address.trim()) return alert("Please enter your delivery address!");
    if (cart.length === 0) return alert("Your cart is empty!");

    // ✅ Save order in context
    const order = {
      id: Date.now(),
      items: cart,
      total,
      paymentMethod,
      address,
      date: new Date().toLocaleString(),
    };
    dispatch({ type: "SaveOrder", payload: order });
    dispatch({ type: "ClearCart" });

    alert(`Order placed successfully using ${paymentMethod.toUpperCase()}!`);
    navigate("/ordersuccess");
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 py-12 px-[7%] flex flex-col lg:flex-row gap-10">
      {/* LEFT - Payment Form */}
      <div className="bg-white shadow-md rounded-2xl p-8 flex-1">
        <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Enter your full address..."
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Select Payment Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center gap-2 p-3 border rounded-lg transition ${
                paymentMethod === "card"
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <CreditCardIcon className="w-6 h-6" />
              Card
            </button>
            <button
              onClick={() => setPaymentMethod("upi")}
              className={`flex items-center gap-2 p-3 border rounded-lg transition ${
                paymentMethod === "upi"
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <BuildingLibraryIcon className="w-6 h-6" />
              UPI
            </button>
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-2 p-3 border rounded-lg transition ${
                paymentMethod === "cod"
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <BanknotesIcon className="w-6 h-6" />
              Cash on Delivery
            </button>
          </div>
        </div>

        {/* Card Form */}
        {paymentMethod === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {["name", "number", "expiry", "cvv"].map((field, i) => (
              <input
                key={i}
                type="text"
                placeholder={
                  field === "name"
                    ? "Name on Card"
                    : field === "number"
                    ? "Card Number"
                    : field === "expiry"
                    ? "Expiry (MM/YY)"
                    : "CVV"
                }
                value={cardDetails[field]}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, [field]: e.target.value })
                }
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              />
            ))}
          </div>
        )}

        {paymentMethod === "upi" && (
          <input
            type="text"
            placeholder="Enter your UPI ID (e.g., name@upi)"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none mb-6"
          />
        )}

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition text-lg font-medium cursor-pointer"
        >
          Place Order
        </button>
      </div>

      {/* RIGHT - Summary */}
      <div className="bg-white shadow-md rounded-2xl p-8 w-full lg:w-[35%] h-fit">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-3 border-b pb-2"
              >
                <span className="font-medium text-gray-700">
                  {item.name} ({item.quantity})
                </span>
                <span className="font-semibold text-red-500">
                  ₹{formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-red-600">₹{formatPrice(total)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}




