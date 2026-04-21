import React, { useEffect, useState, useContext } from "react";
import api from "../../../../api/api"; 
import { AuthContext } from "../../AuthContext";
import { FaBoxOpen, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

export default function OrderHistory() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching order history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const formatPrice = (price) => price.toLocaleString("en-IN");

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">View and track your previous orders.</p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-6 w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <FaBoxOpen className="text-gray-400 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No orders placed yet
            </h2>
            <p className="text-gray-500 mb-6">
              When you make a purchase, it will appear here.
            </p>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Top Section: Order ID & Status */}
                <div className="flex flex-wrap justify-between items-start mb-6 gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <span className="text-gray-500 text-sm">
                      Placed on {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                {/* Info Section: Address & Payment */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Shipping Address
                      </span>
                      <span className="text-sm text-gray-900">
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCreditCard className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Payment Method
                      </span>
                      <span className="text-sm font-medium text-gray-900 uppercase">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
                    Items
                  </h3>
                  {order.orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-600">
                        {item.name} <span className="text-gray-400 mx-1">×</span> {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900">
                        ₹{formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Section */}
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-auto">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    ₹{formatPrice(order.totalPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}