// // import React, { useEffect, useState } from "react";
// // import api from "../../api/api";
// // import { FaUserAstronaut, FaBoxOpen } from "react-icons/fa"; // Added sporty icons

// // export default function Orders() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [updating, setUpdating] = useState(false);

// //   // Fetch all users and their orders
// //   const fetchOrders = async () => {
// //     try {

// //       const res = await api.get("/admin/orders");

// //       setOrders(res.data);

// //     } catch (err) {
// //       console.error("Error fetching orders:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   // Update order status safely
// //   const updateOrderStatus = async (orderId, newStatus) => {
// //     setUpdating(true);
// //     try {

// //       await api.put(`/admin/orders/${orderId}`,{status: newStatus});

// //       setOrders(prev => prev.map(oreder => order._id === orderId ? {...order, status : newStatus}: order))
// //     } catch (err) {
// //       console.error("Error updating order status:", err);
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
// //       </div>
// //     );
// //   }

// //   // Dynamic colors for the dropdown select based on status
// //   const getSelectStyle = (status) => {
// //     switch (status) {
// //       case "Pending":
// //         return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
// //       case "Confirmed":
// //         return "text-blue-500 border-blue-500/50 bg-blue-500/10";
// //       case "Shipped":
// //         return "text-purple-500 border-purple-500/50 bg-purple-500/10";
// //       case "Delivered":
// //         return "text-lime-500 border-lime-500/50 bg-lime-500/10";
// //       case "Cancelled":
// //         return "text-red-500 border-red-500/50 bg-red-500/10";
// //       default:
// //         return "text-white border-zinc-700 bg-zinc-900";
// //     }
// //   };

// //   return (
// //     <div className="text-white">
// //       {/* Header */}
// //       <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
// //         <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
// //         <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
// //           Logistics <span className="text-lime-500">Command</span>
// //         </h1>
// //       </div>

// //       {users.filter((u) => u.orders && u.orders.length > 0).length === 0 ? (
// //         <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 border border-zinc-800 transform -skew-x-2">
// //           <div className="transform skew-x-2 text-center">
// //             <FaBoxOpen className="text-zinc-600 text-6xl mx-auto mb-4" />
// //             <p className="text-2xl font-black italic uppercase tracking-widest text-zinc-500">
// //               No Active Missions.
// //             </p>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="space-y-8">
// //           {users.map(
// //             (user) =>
// //               user.orders &&
// //               user.orders.length > 0 && (
// //                 <div
// //                   key={user.id}
// //                   className="bg-zinc-900 border border-zinc-800 p-6 relative transition-all duration-300 hover:border-lime-500/30"
// //                 >
// //                   {/* User Header */}
// //                   <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
// //                     <div className="w-10 h-10 bg-zinc-950 border border-zinc-700 flex items-center justify-center text-lime-500 transform -skew-x-12">
// //                       <FaUserAstronaut className="transform skew-x-12" />
// //                     </div>
// //                     <div>
// //                       <h2 className="text-xl font-black italic uppercase tracking-tight text-white flex items-baseline gap-2">
// //                         {user.name}
// //                         <span className="text-xs font-bold text-zinc-500 normal-case tracking-widest">
// //                           ({user.email})
// //                         </span>
// //                       </h2>
// //                     </div>
// //                   </div>

// //                   {/* Orders List */}
// //                   <div className="space-y-4">
// //                     {orders.map((order) => (
// //                       <div
// //                         key={order._id}
// //                         className="bg-zinc-950 border border-zinc-800 p-5 flex flex-wrap justify-between items-center gap-4 relative group hover:border-zinc-600 transition-colors"
// //                       >
// //                         {/* Order Info */}
// //                         <div>
// //                           <div className="flex items-center gap-3 mb-1">
// //                             <span className="bg-red-600 text-white text-[10px] font-black italic px-2 py-0.5 uppercase tracking-widest transform -skew-x-12">
// //                               ID
// //                             </span>
// //                             <p className="font-black italic text-zinc-300 tracking-wider">
// //                               #{order.id}
// //                             </p>
// //                           </div>

// //                           <p className="text-zinc-400 font-medium flex items-center gap-3 mt-2">
// //                             <span className="text-lg font-black italic text-lime-500">
// //                               ₹{order.total.toLocaleString()}
// //                             </span>
// //                             <span className="text-zinc-600">|</span>
// //                             <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
// //                               {order.date}
// //                             </span>
// //                             <span className="text-zinc-600">|</span>
// //                             <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
// //                               {order.paymentMethod}
// //                             </span>
// //                           </p>
// //                         </div>

// //                         {/* Status Controls */}
// //                         <div className="flex flex-col items-end gap-1">
// //                           <label className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500">
// //                             Mission Status
// //                           </label>
// //                           <div className="relative">
// //                             <select
// //                               value={order.status || "Pending"}
// //                               onChange={(e) =>
// //                                 updateOrderStatus(
// //                                   user.id,
// //                                   order.id,
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               disabled={updating}
// //                               className={`appearance-none border-2 pl-4 pr-10 py-2 font-black italic uppercase text-xs tracking-widest focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer transition-colors ${getSelectStyle(
// //                                 order.status || "Pending",
// //                               )} ${
// //                                 updating ? "opacity-50 cursor-not-allowed" : ""
// //                               }`}
// //                             >
// //                               <option
// //                                 value="Pending"
// //                                 className="bg-zinc-900 text-yellow-500"
// //                               >
// //                                 Pending
// //                               </option>
// //                               <option
// //                                 value="Confirmed"
// //                                 className="bg-zinc-900 text-blue-500"
// //                               >
// //                                 Confirmed
// //                               </option>
// //                               <option
// //                                 value="Shipped"
// //                                 className="bg-zinc-900 text-purple-500"
// //                               >
// //                                 Shipped
// //                               </option>
// //                               <option
// //                                 value="Delivered"
// //                                 className="bg-zinc-900 text-lime-500"
// //                               >
// //                                 Delivered
// //                               </option>
// //                               <option
// //                                 value="Cancelled"
// //                                 className="bg-zinc-900 text-red-500"
// //                               >
// //                                 Cancelled
// //                               </option>
// //                             </select>
// //                             {/* Custom Dropdown Arrow */}
// //                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current">
// //                               <svg
// //                                 className="h-4 w-4"
// //                                 fill="none"
// //                                 stroke="currentColor"
// //                                 viewBox="0 0 24 24"
// //                               >
// //                                 <path
// //                                   strokeLinecap="round"
// //                                   strokeLinejoin="round"
// //                                   strokeWidth="3"
// //                                   d="M19 9l-7 7-7-7"
// //                                 />
// //                               </svg>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ),
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import api from "../../api/api";
// import { FaBoxOpen } from "react-icons/fa";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/admin/orders");
//       console.log("Orders from API:", res.data);
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId, newStatus) => {
//     setUpdating(true);

//     try {
//       await api.put(`/admin/orders/${orderId}`, {
//         status: newStatus,
//       });

//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order,
//         ),
//       );
//     } catch (err) {
//       console.error("Error updating order status:", err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="text-center text-zinc-500 py-20">
//         <FaBoxOpen className="text-6xl mx-auto mb-4" />
//         <p className="text-2xl font-black italic uppercase">No Orders Found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="text-white">
//       <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
//         <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
//         <h1 className="text-3xl md:text-4xl font-black italic uppercase">
//           Logistics <span className="text-lime-500">Command</span>
//         </h1>
//       </div>

//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-zinc-900 border border-zinc-800 p-5 flex justify-between items-center"
//           >
//             <div>
//               <h3 className=" text-zinc-500">
//                 Order ID: #{order._id.slice(-6)}
//               </h3>
//               {/* <p className="font-bold">{order.user?.name}</p> */}

//               <p className="text-sm text-zinc-400">{order.user?.email}</p>

//               <p className="text-lg font-black text-lime-500 mt-1">
//                 ₹{order.totalPrice}
//               </p>

//               <p className="text-xs text-zinc-500">
//                 Order Date: {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//             </div>

//             <select
//               value={order.status}
//               onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//               disabled={updating}
//               className="bg-zinc-800 border border-zinc-700 px-3 py-2 text-white"
//             >
//               <option value="proccessing">Proccessing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaBoxOpen, FaSpinner } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      console.log("Orders from API:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdating(true);

    try {
      await api.put(`/admin/orders/${orderId}`, {
        status: newStatus,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    } finally {
      setUpdating(false);
    }
  };

  // Helper to style the dropdown based on current status
  const getStatusClasses = (status) => {
    const s = status?.toLowerCase();
    if (s === "processing" || s === "proccessing") return "bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-yellow-500";
    if (s === "shipped") return "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500";
    if (s === "delivered") return "bg-green-50 text-green-700 border-green-200 focus:ring-green-500";
    if (s === "cancelled") return "bg-red-50 text-red-700 border-red-200 focus:ring-red-500";
    return "bg-gray-50 text-gray-700 border-gray-200 focus:ring-gray-500";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100 mt-8">
        <div className="mb-6 w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
          <FaBoxOpen className="text-gray-400 text-3xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Orders Found
        </h2>
        <p className="text-gray-500">
          There are currently no orders in the system.
        </p>
      </div>
    );
  }

  return (
    <div className="font-sans">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Order Management
        </h1>
        <p className="text-gray-500 mt-1">View, track, and update customer orders.</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Order Details */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Order #{order._id.slice(-6)}
                </h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3">
                <p className="text-sm text-gray-600 font-medium">
                  {order.user?.email || "Guest Checkout"}
                </p>
              </div>

              <p className="text-xl font-bold text-blue-600">
                ₹{order.totalPrice?.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Status Update Control */}
            <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:block">
                Status
              </label>
              
              <div className="relative w-full sm:w-auto">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  disabled={updating}
                  className={`w-full sm:w-40 appearance-none border rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 cursor-pointer transition-colors ${getStatusClasses(
                    order.status
                  )} ${updating ? "opacity-50 cursor-wait" : ""}`}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  {updating ? (
                    <FaSpinner className="animate-spin text-blue-500" />
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}