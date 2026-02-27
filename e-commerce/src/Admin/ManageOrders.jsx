import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageOrders() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch all users and their orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status safely
  const updateOrderStatus = async (userId, orderId, newStatus) => {
    setUpdating(true);
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const updatedOrders = user.orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      // PUT replaces the entire user, so we send full data
      const updatedUser = { ...user, orders: updatedOrders };

      await axios.put(`http://localhost:5000/users/${userId}`, updatedUser);

      // Update UI instantly
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, orders: updatedOrders } : u
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Manage Orders
      </h1>

      {users.filter((u) => u.orders && u.orders.length > 0).length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        users.map(
          (user) =>
            user.orders &&
            user.orders.length > 0 && (
              <div
                key={user.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-8"
              >
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  👤 {user.name}{" "}
                  <span className="text-gray-500">({user.email})</span>
                </h2>

                <div className="space-y-4">
                  {user.orders.map((order) => (
                    <div
                      key={order.id}
                      className="border p-4 rounded-xl flex flex-wrap justify-between items-center gap-3"
                    >
                      <div>
                        <p className="font-semibold text-red-600">
                          Order id : #{order.id}
                        </p>
                        <p className="text-gray-700">
                          ₹{order.total.toLocaleString()} —{" "}
                          <span className="text-sm text-gray-600">
                            {order.date} | {order.paymentMethod}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600">
                          Status:
                        </label>
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) =>
                            updateOrderStatus(user.id, order.id, e.target.value)
                          }
                          disabled={updating}
                          className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )
      )}
    </div>
  );
}
