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

// Sporty Theme Colors: Lime, Red, Orange, Zinc
const COLORS = ["#84cc16", "#dc2626", "#f97316", "#71717a"];

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

  // Recharts Dark Theme Tooltip Style
  const customTooltipStyle = {
    backgroundColor: "#09090b", // zinc-950
    borderColor: "#27272a", // zinc-800
    color: "#fff",
    fontStyle: "italic",
    fontWeight: 900,
    textTransform: "uppercase",
    borderRadius: "0px",
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
        <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
          Telemetry <span className="text-lime-500">Dashboard</span>
        </h1>
      </div>

      {/* Top Section: Cards & Pie Chart */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/2">
          {/* Revenue Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
            <div className="transform skew-x-6">
              <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
                Total Payload
              </h2>
              <p className="text-3xl md:text-4xl font-black italic text-lime-500">
                ₹{stats.revenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
            <div className="transform skew-x-6">
              <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
                Total Orders
              </h2>
              <p className="text-3xl md:text-4xl font-black italic text-white">
                {stats.orders}
              </p>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
            <div className="transform skew-x-6">
              <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
                Active Gear
              </h2>
              <p className="text-3xl md:text-4xl font-black italic text-white">
                {stats.products}
              </p>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500 transition-colors duration-300 group">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all" />
            <div className="transform skew-x-6">
              <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">
                Registered Racers
              </h2>
              <p className="text-3xl md:text-4xl font-black italic text-white">
                {stats.users}
              </p>
            </div>
          </div>
        </div>

        {/* Pie Chart Container */}
        <div className="w-full lg:w-1/2 bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-6 hover:border-lime-500/50 transition-colors duration-300">
          <div className="transform skew-x-6 flex flex-col items-center justify-center h-full">
            <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs w-full text-left mb-4">
              Entity Distribution
            </h2>
            <div className="w-full flex justify-center -ml-4">
              <PieChart width={350} height={250}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  stroke="#18181b"
                  strokeWidth={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={customTooltipStyle}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend
                  wrapperStyle={{
                    fontStyle: "italic",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="space-y-8">
        {/* Order Bar Chart */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-2 hover:border-lime-500/50 transition-colors duration-300">
          <div className="transform skew-x-2">
            <h2 className="text-xl font-black italic uppercase tracking-wider text-white mb-6">
              Mission <span className="text-lime-500">Volume</span> (Orders)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderTimeline}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#52525b"
                  tick={{
                    fill: "#a1a1aa",
                    fontStyle: "italic",
                    fontWeight: 900,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  stroke="#52525b"
                  tick={{
                    fill: "#a1a1aa",
                    fontStyle: "italic",
                    fontWeight: 900,
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={customTooltipStyle}
                  cursor={{ fill: "#27272a", opacity: 0.4 }}
                />
                <Legend
                  wrapperStyle={{
                    fontStyle: "italic",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#84cc16"
                  barSize={40}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Bar Chart */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 relative transform -skew-x-2 hover:border-red-500/50 transition-colors duration-300">
          <div className="transform skew-x-2">
            <h2 className="text-xl font-black italic uppercase tracking-wider text-white mb-6">
              Financial <span className="text-red-600">Velocity</span> (Revenue)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueTimeline}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#52525b"
                  tick={{
                    fill: "#a1a1aa",
                    fontStyle: "italic",
                    fontWeight: 900,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  stroke="#52525b"
                  tick={{
                    fill: "#a1a1aa",
                    fontStyle: "italic",
                    fontWeight: 900,
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={customTooltipStyle}
                  cursor={{ fill: "#27272a", opacity: 0.4 }}
                />
                <Legend
                  wrapperStyle={{
                    fontStyle: "italic",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#dc2626"
                  barSize={40}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
