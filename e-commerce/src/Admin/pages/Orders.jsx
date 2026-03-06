// import React, { useEffect, useState } from "react";
// import api from "../../api/api";

// export default function Orders() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // Fetch all users and their orders
//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers(res.data || []);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Update order status safely
//   const updateOrderStatus = async (userId, orderId, newStatus) => {
//     setUpdating(true);
//     try {
//       const user = users.find((u) => u.id === userId);
//       if (!user) return;

//       const updatedOrders = user.orders.map((order) =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       );

//       // PUT replaces the entire user, so we send full data
//       const updatedUser = { ...user, orders: updatedOrders };

//       await api.put(`/users/${userId}`, updatedUser);

//       // Update UI instantly
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u.id === userId ? { ...u, orders: updatedOrders } : u
//         )
//       );
//     } catch (err) {
//       console.error("Error updating order status:", err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <p className="text-center py-10">Loading orders...</p>;

//   return (
//     <div className="p-8  min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//         Manage Orders
//       </h1>

//       {users.filter((u) => u.orders && u.orders.length > 0).length === 0 ? (
//         <p className="text-center text-gray-600">No orders found.</p>
//       ) : (
//         users.map(
//           (user) =>
//             user.orders &&
//             user.orders.length > 0 && (
//               <div
//                 key={user.id}
//                 className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-8"
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                    {user.name}{" "}
//                   <span className="text-gray-500">({user.email})</span>
//                 </h2>

//                 <div className="space-y-4">
//                   {user.orders.map((order) => (
//                     <div
//                       key={order.id}
//                       className="border p-4 rounded-xl flex flex-wrap justify-between items-center gap-3"
//                     >
//                       <div>
//                         <p className="font-semibold text-red-600">
//                           Order id : #{order.id}
//                         </p>
//                         <p className="text-gray-700">
//                           ₹{order.total.toLocaleString()} —{" "}
//                           <span className="text-sm text-gray-600">
//                             {order.date} | {order.paymentMethod}
//                           </span>
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <label className="text-sm font-medium text-gray-600">
//                           Status:
//                         </label>
//                         <select
//                           value={order.status || "Pending"}
//                           onChange={(e) =>
//                             updateOrderStatus(user.id, order.id, e.target.value)
//                           }
//                           disabled={updating}
//                           className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-400"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Confirmed">Confirmed</option>
//                           <option value="Shipped">Shipped</option>
//                           <option value="Delivered">Delivered</option>
//                           <option value="Cancelled">Cancelled</option>
//                         </select>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )
//         )
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaUserAstronaut, FaBoxOpen } from "react-icons/fa"; // Added sporty icons

export default function Orders() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch all users and their orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/users");
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

      await api.put(`/users/${userId}`, updatedUser);

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

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
        </div>
    );
  }

  // Dynamic colors for the dropdown select based on status
  const getSelectStyle = (status) => {
      switch(status) {
          case 'Pending': return 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10';
          case 'Confirmed': return 'text-blue-500 border-blue-500/50 bg-blue-500/10';
          case 'Shipped': return 'text-purple-500 border-purple-500/50 bg-purple-500/10';
          case 'Delivered': return 'text-lime-500 border-lime-500/50 bg-lime-500/10';
          case 'Cancelled': return 'text-red-500 border-red-500/50 bg-red-500/10';
          default: return 'text-white border-zinc-700 bg-zinc-900';
      }
  }

  return (
    <div className="text-white">
        
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
        <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            Logistics <span className="text-lime-500">Command</span>
        </h1>
      </div>

      {users.filter((u) => u.orders && u.orders.length > 0).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 border border-zinc-800 transform -skew-x-2">
            <div className="transform skew-x-2 text-center">
                <FaBoxOpen className="text-zinc-600 text-6xl mx-auto mb-4" />
                <p className="text-2xl font-black italic uppercase tracking-widest text-zinc-500">No Active Missions.</p>
            </div>
        </div>
      ) : (
        <div className="space-y-8">
            {users.map(
            (user) =>
                user.orders &&
                user.orders.length > 0 && (
                <div
                    key={user.id}
                    className="bg-zinc-900 border border-zinc-800 p-6 relative transition-all duration-300 hover:border-lime-500/30"
                >
                    {/* User Header */}
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                        <div className="w-10 h-10 bg-zinc-950 border border-zinc-700 flex items-center justify-center text-lime-500 transform -skew-x-12">
                            <FaUserAstronaut className="transform skew-x-12" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight text-white flex items-baseline gap-2">
                                {user.name} 
                                <span className="text-xs font-bold text-zinc-500 normal-case tracking-widest">({user.email})</span>
                            </h2>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                    {user.orders.map((order) => (
                        <div
                        key={order.id}
                        className="bg-zinc-950 border border-zinc-800 p-5 flex flex-wrap justify-between items-center gap-4 relative group hover:border-zinc-600 transition-colors"
                        >
                            {/* Order Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="bg-red-600 text-white text-[10px] font-black italic px-2 py-0.5 uppercase tracking-widest transform -skew-x-12">
                                        ID
                                    </span>
                                    <p className="font-black italic text-zinc-300 tracking-wider">
                                        #{order.id}
                                    </p>
                                </div>
                                
                                <p className="text-zinc-400 font-medium flex items-center gap-3 mt-2">
                                    <span className="text-lg font-black italic text-lime-500">₹{order.total.toLocaleString()}</span>
                                    <span className="text-zinc-600">|</span>
                                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">{order.date}</span>
                                    <span className="text-zinc-600">|</span>
                                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">{order.paymentMethod}</span>
                                </p>
                            </div>

                            {/* Status Controls */}
                            <div className="flex flex-col items-end gap-1">
                                <label className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500">
                                    Mission Status
                                </label>
                                <div className="relative">
                                    <select
                                        value={order.status || "Pending"}
                                        onChange={(e) =>
                                            updateOrderStatus(user.id, order.id, e.target.value)
                                        }
                                        disabled={updating}
                                        className={`appearance-none border-2 pl-4 pr-10 py-2 font-black italic uppercase text-xs tracking-widest focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer transition-colors ${getSelectStyle(order.status || 'Pending')} ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <option value="Pending" className="bg-zinc-900 text-yellow-500">Pending</option>
                                        <option value="Confirmed" className="bg-zinc-900 text-blue-500">Confirmed</option>
                                        <option value="Shipped" className="bg-zinc-900 text-purple-500">Shipped</option>
                                        <option value="Delivered" className="bg-zinc-900 text-lime-500">Delivered</option>
                                        <option value="Cancelled" className="bg-zinc-900 text-red-500">Cancelled</option>
                                    </select>
                                    {/* Custom Dropdown Arrow */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                )
            )}
        </div>
      )}
    </div>
  );
}