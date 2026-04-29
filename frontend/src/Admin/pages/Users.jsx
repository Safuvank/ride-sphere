


import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaBan, FaCheck, FaUserSlash, FaSearch } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users?page=${page}&keyword=${keyword}`);
      setUsers(res.data.users);
      setPages(res.data.pages);
    } catch (error) {
      // console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, keyword]);

  const toggleBlock = async (user) => {
    try {
      const res = await api.put(`/admin/users/block/${user._id}`);
      setUsers(users.map((u) => (u._id === user._id ? res.data : u)));
    } catch (error) {
      // console.error("Error updating user:", error);
    }
  };

  return (
    <div className="font-sans">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          User Management
        </h1>
        <p className="text-gray-500 mt-1">View registered users and manage account access.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex items-center">
        <FaSearch className="text-gray-400 ml-2 mr-4" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-sm"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <FaUserSlash className="text-gray-300 text-4xl mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No users found matching your search.</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                      {user._id}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.blocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.blocked ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleBlock(user)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          user.blocked
                            ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                            : "bg-white border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-100"
                        }`}
                      >
                        {user.blocked ? (
                          <>
                            <FaCheck size={12} />
                            <span>Restore Access</span>
                          </>
                        ) : (
                          <>
                            <FaBan size={12} />
                            <span>Suspend User</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => setPage(x + 1)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                page === x + 1
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}