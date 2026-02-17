// import React, { useContext } from "react";
// import { cartContext } from "../../../../Common/Context/ProviderComp";

// export default function OrderHistory() {
//   const {
//     state: { orders },
//   } = useContext(cartContext);

//   const formatPrice = (price) => price.toLocaleString("en-IN");

//   return (
//     <div className="pt-20 min-h-screen bg-gray-50 py-12 px-[7%]">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
//         Order History
//       </h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-600 text-lg">No orders placed yet.</p>
//       ) : (
//         <div className="space-y-8">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
//             >
//               <div className="flex justify-between mb-3">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold text-red-600">
//                     Order #{order.id}
//                   </h2>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       order.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : order.status === "Confirmed"
//                         ? "bg-blue-100 text-blue-700"
//                         : order.status === "Shipped"
//                         ? "bg-purple-100 text-purple-700"
//                         : order.status === "Delivered"
//                         ? "bg-green-100 text-green-700"
//                         : order.status === "Cancelled"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {order.status || "Pending"}
//                   </span>
//                 </div>
//                 <span className="text-gray-500">{order.date}</span>
//               </div>
//               <p className="text-gray-700 mb-3">
//                 <strong>Address:</strong> {order.address}
//               </p>
//               <p className="text-gray-700 mb-3">
//                 <strong>Payment:</strong> {order.paymentMethod.toUpperCase()}
//               </p>

//               <div className="border-t pt-3 mt-3">
//                 {order.items.map((item) => (
//                   <div key={item.id} className="flex justify-between mb-2">
//                     <span>
//                       {item.name} × {item.quantity}
//                     </span>
//                     <span>₹{formatPrice(item.price * item.quantity)}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t mt-4 pt-3 flex justify-between text-lg font-semibold">
//                 <span>Total:</span>
//                 <span className="text-red-600">
//                   ₹{formatPrice(order.total)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }










import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Authantication/AuthContext";

export default function OrderHistory() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:5000/users/${user.id}`);
      setOrders(res.data.orders || []);
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
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Confirmed":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="pt-20 min-h-screen bg-gray-50 py-12 px-[7%]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">No orders placed yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <div className="flex justify-between mb-3">
                <h2 className="text-xl font-semibold text-red-600">Order #{order.id}</h2>
                <span className="text-gray-500">{order.date}</span>
              </div>
              <div className="mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status || "Pending"
                  )}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Payment:</strong> {order.paymentMethod?.toUpperCase() || "N/A"}
              </p>
              <div className="border-t pt-3 mt-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-3 flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-red-600">₹{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}









