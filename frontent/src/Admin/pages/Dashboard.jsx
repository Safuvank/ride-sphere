// import React, { useEffect, useState } from "react";
// import api from "../../api/api";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// // Sporty Theme Colors: Lime, Red, Orange, Zinc
// const COLORS = ["#84cc16", "#dc2626", "#f97316", "#71717a"];

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     users: 0,
//     products: 0,
//     orders: 0,
//     revenue: 0,
//   });
//   const [orderTimeline, setOrderTimeline] = useState([]);
//   const [revenueTimeline, setRevenueTimeline] = useState([]);



//   const fetchStats = async () => {
//   try {
//     const res = await api.get("/admin/dashboard");

//     setStats({
//       users: res.data.users,
//       products: res.data.products,
//       orders: res.data.totalOrders,
//       revenue: res.data.totalRevenue,
//     });

//     setOrderTimeline(res.data.orderTimeline);
//     setRevenueTimeline(res.data.revenueTimeline);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const pieData = [
//     { name: "Users", value: stats.users },
//     { name: "Products", value: stats.products },
//     { name: "Orders", value: stats.orders },
//   ];

//   // Recharts Dark Theme Tooltip Style
//   const customTooltipStyle = {
//     backgroundColor: "#09090b", // zinc-950
//     borderColor: "#27272a", // zinc-800
//     color: "#fff",
//     fontStyle: "italic",
//     fontWeight: 900,
//     textTransform: "uppercase",
//     borderRadius: "0px",
//   };

//   return (
//     <div className="text-white">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
//         <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
//         <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
//           Telemetry <span className="text-lime-500">Dashboard</span>
//         </h1>
//       </div>

//       {/* Top Section: Cards & Pie Chart */}
//       <div className="flex flex-col lg:flex-row gap-8 mb-8">
//         {/* Metric Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/2">
//           {/* Revenue Card */}
//           <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
//             <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
//             <div className="transform skew-x-6">
//               <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
//                 Total Payload
//               </h2>
//               <p className="text-3xl md:text-4xl font-black italic text-lime-500">
//                 ₹{stats.revenue.toLocaleString()}
//               </p>
//             </div>
//           </div>

//           {/* Orders Card */}
//           <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
//             <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
//             <div className="transform skew-x-6">
//               <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
//                 Total Orders
//               </h2>
//               <p className="text-3xl md:text-4xl font-black italic text-white">
//                 {stats.orders}
//               </p>
//             </div>
//           </div>

//           {/* Products Card */}
//           <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
//             <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
//             <div className="transform skew-x-6">
//               <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
//                 Active Gear
//               </h2>
//               <p className="text-3xl md:text-4xl font-black italic text-white">
//                 {stats.products}
//               </p>
//             </div>
//           </div>

//           {/* Users Card */}
//           <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
//             <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
//             <div className="transform skew-x-6">
//               <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
//                 Registered Racers
//               </h2>
//               <p className="text-3xl md:text-4xl font-black italic text-white">
//                 {stats.users}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Pie Chart Container */}
//         <div className="w-full lg:w-1/2 bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500/50 transition-colors duration-300">
//           <div className="transform skew-x-6 flex flex-col items-center justify-center h-full">
//             <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs w-full text-left mb-4">
//               Entity Distribution
//             </h2>
//             <div className="w-full flex justify-center -ml-4">
//               <PieChart width={350} height={250}>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={100}
//                   innerRadius={60}
//                   stroke="#18181b"
//                   strokeWidth={4}
//                   dataKey="value"
//                 >
//                   {pieData.map((_, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={customTooltipStyle}
//                   itemStyle={{ color: "#fff" }}
//                 />
//                 <Legend
//                   wrapperStyle={{
//                     fontStyle: "italic",
//                     fontWeight: 900,
//                     textTransform: "uppercase",
//                     fontSize: "12px",
//                   }}
//                 />
//               </PieChart>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Analytics Charts Section */}
//       <div className="space-y-8">
//         {/* Order Bar Chart */}
//         <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-2 hover:border-lime-500/50 transition-colors duration-300">
//           <div className="transform skew-x-2">
//             <h2 className="text-xl font-black italic uppercase tracking-wider text-white mb-6">
//               Mission <span className="text-lime-500">Volume</span> (Orders)
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={orderTimeline}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#27272a"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="date"
//                   stroke="#52525b"
//                   tick={{
//                     fill: "#a1a1aa",
//                     fontStyle: "italic",
//                     fontWeight: 900,
//                     fontSize: 12,
//                   }}
//                 />
//                 <YAxis
//                   stroke="#52525b"
//                   tick={{
//                     fill: "#a1a1aa",
//                     fontStyle: "italic",
//                     fontWeight: 900,
//                     fontSize: 12,
//                   }}
//                 />
//                 <Tooltip
//                   contentStyle={customTooltipStyle}
//                   cursor={{ fill: "#27272a", opacity: 0.4 }}
//                 />
//                 <Legend
//                   wrapperStyle={{
//                     fontStyle: "italic",
//                     fontWeight: 900,
//                     textTransform: "uppercase",
//                     fontSize: "12px",
//                   }}
//                 />
//                 <Bar
//                   dataKey="orders"
//                   fill="#84cc16"
//                   barSize={40}
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Revenue Bar Chart */}
//         <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-2 hover:border-red-500/50 transition-colors duration-300">
//           <div className="transform skew-x-2">
//             <h2 className="text-xl font-black italic uppercase tracking-wider text-white mb-6">
//               Financial <span className="text-red-600">Velocity</span> (Revenue)
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={revenueTimeline}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#27272a"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="date"
//                   stroke="#52525b"
//                   tick={{
//                     fill: "#a1a1aa",
//                     fontStyle: "italic",
//                     fontWeight: 900,
//                     fontSize: 12,
//                   }}
//                 />
//                 <YAxis
//                   stroke="#52525b"
//                   tick={{
//                     fill: "#a1a1aa",
//                     fontStyle: "italic",
//                     fontWeight: 900,
//                     fontSize: 12,
//                   }}
//                 />
//                 <Tooltip
//                   contentStyle={customTooltipStyle}
//                   cursor={{ fill: "#27272a", opacity: 0.4 }}
//                 />
//                 <Legend
//                   wrapperStyle={{
//                     fontStyle: "italic",
//                     fontWeight: 900,
//                     textTransform: "uppercase",
//                     fontSize: "12px",
//                   }}
//                 />
//                 <Bar
//                   dataKey="revenue"
//                   fill="#dc2626"
//                   barSize={40}
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";

// Professional Dashboard Colors: Blue, Emerald, Indigo, Gray
const COLORS = ["#3b82f6", "#10b981", "#6366f1", "#9ca3af"];

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [orderTimeline, setOrderTimeline] = useState([]);
  const [revenueTimeline, setRevenueTimeline] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      setStats({
        users: res.data.users,
        products: res.data.products,
        orders: res.data.totalOrders,
        revenue: res.data.totalRevenue,
      });

      setOrderTimeline(res.data.orderTimeline);
      setRevenueTimeline(res.data.revenueTimeline);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const pieData = [
    { name: "Users", value: stats.users },
    { name: "Products", value: stats.products },
    { name: "Orders", value: stats.orders },
  ];

  // Clean Light Mode Tooltip Style
  const customTooltipStyle = {
    backgroundColor: "#ffffff",
    borderColor: "#f3f4f6",
    color: "#111827",
    fontWeight: 500,
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    padding: "8px 12px",
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">Welcome back. Here's what's happening with your store today.</p>
      </div>

      {/* Top Section: Cards & Pie Chart */}
      <div className="flex flex-col xl:flex-row gap-6 mb-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full xl:w-2/3">
          
          {/* Revenue Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900">
                ₹{stats.revenue.toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <DollarSign size={24} />
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1">Total Orders</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.orders.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <ShoppingCart size={24} />
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1">Total Products</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.products.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <Package size={24} />
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1">Registered Users</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.users.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <Users size={24} />
            </div>
          </div>
          
        </div>

        {/* Pie Chart Container */}
        <div className="w-full xl:w-1/3 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-gray-900 font-bold text-lg mb-4">
            Data Distribution
          </h2>
          <div className="w-full flex justify-center items-center h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={55}
                  stroke="#ffffff"
                  strokeWidth={3}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend
                  wrapperStyle={{
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#4b5563"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Order Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Orders Timeline
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#d1d5db"
                tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
                tickMargin={10}
              />
              <YAxis
                stroke="#d1d5db"
                tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
                tickMargin={10}
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                cursor={{ fill: "#f3f4f6", opacity: 0.8 }}
              />
              <Legend wrapperStyle={{ fontWeight: 500, fontSize: "13px" }} />
              <Bar
                dataKey="orders"
                name="Orders"
                fill="#3b82f6"
                barSize={32}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Revenue Timeline
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#d1d5db"
                tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
                tickMargin={10}
              />
              <YAxis
                stroke="#d1d5db"
                tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
                tickMargin={10}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                cursor={{ fill: "#f3f4f6", opacity: 0.8 }}
                formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Legend wrapperStyle={{ fontWeight: 500, fontSize: "13px" }} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#10b981"
                barSize={32}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
      </div>
    </div>
  );
}