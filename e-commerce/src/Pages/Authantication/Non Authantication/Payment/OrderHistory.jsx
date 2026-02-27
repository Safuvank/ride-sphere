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

// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../../Authantication/AuthContext";

// export default function OrderHistory() {
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     if (!user?.token) return;
//     try {
//       const res = await axios.get(
//         "http://localhost:9000/api/orders/my-orders",
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         },
//       );

//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching order history:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [user]);

//   const formatPrice = (price) => price.toLocaleString("en-IN");
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Processing":
//         return "bg-blue-100 text-blue-700";
//       case "Shipped":
//         return "bg-purple-100 text-purple-700";
//       case "Delivered":
//         return "bg-green-100 text-green-700";
//       case "Cancelled":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   if (loading) return <p className="text-center py-20">Loading...</p>;

//   return (
//     <div className="pt-20 min-h-screen bg-gray-50 py-12 px-[7%]">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
//         Order History
//       </h1>
//       {orders.length === 0 ? (
//         <p className="text-gray-600 text-lg text-center">
//           No orders placed yet.
//         </p>
//       ) : (
//         <div className="space-y-8">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
//             >
//               <div className="flex justify-between mb-3">
//                 <h2 className="text-xl font-semibold text-red-600">
//                   Order #{order._id.slice(-6)}
//                 </h2>
//                 <span className="text-gray-500">{order.date}</span>
//               </div>
//               <div className="mb-3">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
//                     order.status || "Pending",
//                   )}`}
//                 >
//                   {order.status || "Pending"}
//                 </span>
//               </div>
//               <p className="text-gray-700 mb-3">
//                 <strong>Address:</strong> {order.address}
//               </p>
//               <p className="text-gray-700 mb-3">
//                 <strong>Payment:</strong>{" "}
//                 {order.paymentMethod?.toUpperCase() || "N/A"}
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

// import React, { useEffect, useState, useContext } from "react";
// import api from "../../../../api/api";
// import { AuthContext } from "../../AuthContext";

// export default function OrderHistory() {
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("/orders/my-orders");
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching order history:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [user]);

//   const formatPrice = (price) => price.toLocaleString("en-IN");

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Processing":
//         return "bg-yellow-100 text-yellow-700";
//       case "Shipped":
//         return "bg-purple-100 text-purple-700";
//       case "Delivered":
//         return "bg-green-100 text-green-700";
//       case "Cancelled":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   if (loading) {
//     return <p className="text-center py-20">Loading...</p>;
//   }

//   return (
//     <div className="pt-20 min-h-screen bg-gray-50 py-12 px-[7%]">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
//         Order History
//       </h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-600 text-lg text-center">
//           No orders placed yet.
//         </p>
//       ) : (
//         <div className="space-y-8">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white p-6 rounded-2xl shadow-md border"
//             >
//               <div className="flex justify-between mb-3">
//                 <h2 className="text-xl font-semibold text-red-600">
//                   Order #{order._id.slice(-6)}
//                 </h2>
//                 <span className="text-gray-500">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </span>
//               </div>

//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
//                   order.status,
//                 )}`}
//               >
//                 {order.status}
//               </span>

//               <p className="mt-3 text-gray-700">
//                 <strong>Address:</strong> {order.shippingAddress.address},{" "}
//                 {order.shippingAddress.city}
//               </p>

//               <p className="text-gray-700">
//                 <strong>Payment:</strong> {order.paymentMethod.toUpperCase()}
//               </p>

//               <div className="border-t mt-4 pt-3">
//                 {order.orderItems.map((item) => (
//                   <div
//                     key={item.productId}
//                     className="flex justify-between mb-2"
//                   >
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
//                   ₹{formatPrice(order.totalPrice)}
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
import api from "../../../../api/api"; 
import axios from "axios"; 
import { AuthContext } from "../../AuthContext";
import { FaBoxOpen, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";

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
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "Shipped":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Delivered":
        return "bg-lime-500/10 text-lime-400 border-lime-500/30";
      case "Cancelled":
        return "bg-red-600/10 text-red-500 border-red-600/30";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-zinc-950 py-12 px-[7%] relative overflow-hidden text-white">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-0 left-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
         <div className="absolute top-0 right-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-lime-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-zinc-800 pb-4">
            <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                Order <span className="text-lime-500">History</span>
            </h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center bg-zinc-900/50 border border-zinc-800 transform -skew-x-6">
            <div className="transform skew-x-6">
                <FaBoxOpen className="text-zinc-700 text-6xl mb-6 mx-auto" />
                <p className="text-zinc-400 text-xl font-black italic uppercase tracking-widest">
                No missions completed yet.
                </p>
                <p className="text-zinc-500 mt-2 text-sm font-bold uppercase">
                    Your order history is currently empty.
                </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="group bg-zinc-900 border border-zinc-800 p-8 relative transition-all duration-300 hover:border-lime-500/50 hover:shadow-xl hover:shadow-lime-500/10 hover:-translate-y-1"
              >
                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all duration-300" />

                {/* Top Section: Order ID & Status */}
                <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-black italic uppercase text-white tracking-tight flex items-center gap-2">
                        <span className="text-zinc-500">#</span>{order._id.slice(-6)}
                    </h2>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className={`px-4 py-1 border transform -skew-x-12 ${getStatusColor(order.status)}`}>
                    <span className="block transform skew-x-12 font-black italic uppercase tracking-wider text-xs">
                        {order.status}
                    </span>
                  </div>
                </div>

                {/* Info Section: Address & Payment */}
                <div className="bg-zinc-950 p-4 border border-zinc-800 mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-lime-500 mt-1 flex-shrink-0" />
                    <div>
                        <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Delivery Route</span>
                        <span className="text-sm font-medium text-zinc-300 uppercase">
                            {order.shippingAddress.address}, {order.shippingAddress.city}
                        </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCreditCard className="text-lime-500 mt-1 flex-shrink-0" />
                    <div>
                        <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Payment Protocol</span>
                        <span className="text-sm font-black italic text-zinc-300 uppercase">
                            {order.paymentMethod}
                        </span>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 mb-6">
                    <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest border-b border-zinc-800 pb-2">Manifest</span>
                  {order.orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="font-bold text-zinc-300 uppercase tracking-wide">
                        {item.name} <span className="text-lime-500 mx-1">x</span> {item.quantity}
                      </span>
                      <span className="font-black italic text-zinc-400">
                        ₹{formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Section */}
                <div className="border-t border-zinc-800 pt-4 flex justify-between items-center mt-auto">
                  <span className="text-sm font-black italic uppercase text-zinc-500 tracking-widest">
                    Total Payload
                  </span>
                  <span className="text-2xl font-black italic text-lime-500">
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