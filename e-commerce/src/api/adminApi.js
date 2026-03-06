import api from "./api";


// Users
export const getAllUsers = () => api.get("/admin/users");
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);

// Products
export const createProduct = (data) => api.post("/admin/products", data);
export const updateProduct = (id, data) =>
  api.put(`/admin/products/${id}`, data);
export const deleteProduct = (id) =>
  api.delete(`/admin/products/${id}`);

// Orders
export const getAllOrders = () => api.get("/admin/orders");
export const updateOrderStatus = (id, data) =>
  api.put(`/admin/orders/${id}`, data);