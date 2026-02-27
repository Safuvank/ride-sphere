import React, { useEffect, useState } from "react";
import axios from "axios";
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

const COLORS = ["#0088FE", "#00C49f", "#FFBB28", "#FF8042"];

export default function Overview() {
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
      const [usersRes, productsRes, usersWithOrders] = await Promise.all([
        axios.get("http://localhost:5000/users"),
        axios.get("http://localhost:5000/products"),
        axios.get("http://localhost:5000/users"),
      ]);

      const users = usersWithOrders.data || [];

      let totalOrders = 0;
      let totalRevenue = 0;
      const orderTimelineData = {};
      const revenueTimelineData = {};

      users.forEach((user) => {
        if (user.orders && Array.isArray(user.orders)) {
          user.orders.forEach((order) => {
            totalOrders++;
            if (order.total) totalRevenue += order.total;

            const date =
              order.date || order.createdAt || new Date().toISOString();
            const day = new Date(date).toISOString().split("T")[0];

            orderTimelineData[day] = (orderTimelineData[day] || 0) + 1;
            revenueTimelineData[day] =
              (revenueTimelineData[day] || 0) + (order.total || 0);
          });
        }
      });

      const orderTimelineArray = Object.entries(orderTimelineData)
        .map(([date, orders]) => ({ date, orders }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const revenueTimelineArray = Object.entries(revenueTimelineData)
        .map(([date, revenue]) => ({ date, revenue }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setStats({
        users: usersRes.data.length,
        products: productsRes.data.length,
        orders: totalOrders,
        revenue: totalRevenue,
      });

      setOrderTimeline(orderTimelineArray);
      setRevenueTimeline(revenueTimelineArray);
    } catch (error) {
      console.error("Error fetching overview data:", error);
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Overview Dashboard</h1>

      {/* Cards */}

      <div className="flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 w-[50%]">
        <div className="bg-white p-5 shadow-md rounded-xl text-center">
          <h2 className="text-gray-500 text-sm">Total Revenue</h2>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            ₹{stats.revenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 shadow-md rounded-xl text-center">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {stats.orders}
          </p>
        </div>

        <div className="bg-white p-5 shadow-md rounded-xl text-center">
          <h2 className="text-gray-500 text-sm">Total Products</h2>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {stats.products}
          </p>
        </div>
        <div className="bg-white p-5 shadow-md rounded-xl text-center">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {stats.users}
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-10 inline">
        <PieChart width={420} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      </div>

      {/* Order Bar Chart */}
      <div>
        <div className="bg-white p-6 rounded-xl shadow-md mb-10 ">
          <h2 className="text-lg font-semibold mb-4"> Order Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#00C49F" barSize={100} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Bar Chart */}

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Revenue Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" barSize={100} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
